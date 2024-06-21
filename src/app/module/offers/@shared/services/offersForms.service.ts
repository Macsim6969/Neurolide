import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BackendService } from "../../../../shared/services/backend.service";
import { OfferInterface } from "../interface/offer.interface";


@Injectable()

export class OfferFormService {
  private usedIds: Set<string> = new Set();
  private isOffersFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private offerFormDataSubject: BehaviorSubject<OfferInterface> = new BehaviorSubject<OfferInterface>(null);
  private statusModeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private backendService: BackendService,
  ) { }

  set _isOfferForm(value: boolean) {
    this.isOffersFormSubject.next(value);
  }

  get _isOfferForm$() {
    return this.isOffersFormSubject;
  }

  set _offerData(value: OfferInterface) {
    this.offerFormDataSubject.next(value);
  }

  get _offerData$() {
    return this.offerFormDataSubject;
  }

  set _statusMOde(value: string) {
    this.statusModeSubject.next(value);
  }

  get _statusMOde$() {
    return this.statusModeSubject;
  }

  public sendMediaChannelsData(newForm: OfferInterface, choiceMethod: string) {
    const id = JSON.parse(localStorage.getItem('id'))
    const newOffers: OfferInterface = {
      id: this.generateUniqueId(6),
      name: newForm.name,
      link: newForm.link,
      brand: newForm.brand,
      payments: newForm.payments,
      payout: choiceMethod,
      balance: newForm.balance,
      vip: false,
    }

    this.backendService.setNewOffers(newOffers)
  }

  private generateUniqueId(length: number): number {
    const chars = '0123456789';
    let id = '';
    do {
      id = '';
      for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this.usedIds.has(id));

    this.usedIds.add(id);
    return +id;
  }
}