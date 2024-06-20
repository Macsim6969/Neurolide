import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BackendService } from "../../../../shared/services/backend.service";
import { OfferInterface } from "../interface/offer.interface";


@Injectable()

export class OfferFormService {
  private usedIds: Set<string> = new Set();
  private isOffersFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private backendService: BackendService,
  ) { }

  set _isOfferForm(value: boolean) {
    this.isOffersFormSubject.next(value);
  }

  get _isOfferForm$() {
    return this.isOffersFormSubject;
  }

  public sendMediaChannelsData(newForm: OfferInterface, choiceMethod: string) {
    const id = JSON.parse(localStorage.getItem('id'))
    const newOffers: OfferInterface = {
      id: this.generateUniqueId(10),
      name: newForm.name,
      link: newForm.link,
      brand: newForm.brand,
      payments: newForm.payments,
      payout: choiceMethod,
      balance: newForm.balance,
      vip: false,
    }

    this.backendService.setNewOffers(id, newOffers)
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