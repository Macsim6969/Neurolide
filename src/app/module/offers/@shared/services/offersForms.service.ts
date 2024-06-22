import { Injectable } from "@angular/core";
import { BehaviorSubject, take } from "rxjs";
import { BackendService } from "../../../../shared/services/backend.service";
import { OfferInterface } from "../interface/offer.interface";
import { Store, select } from "@ngrx/store";
import { StoreInterface } from "../../../../store/model/store.model";
import { selectOffersData } from "../../../../store/selectors/store.selectors";


@Injectable()

export class OfferFormService {
  private isOffersFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private offerFormDataSubject: BehaviorSubject<OfferInterface> = new BehaviorSubject<OfferInterface>(null);
  private statusModeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private rulesOfferMode: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private statusOfferSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private backendService: BackendService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  set _rulesOffer(value: string) {
    this.rulesOfferMode.next(value);
  }

  get _rulesOffer() {
    return this.rulesOfferMode.getValue();
  }

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

  set _statusOffer(value: string) {
    this.statusOfferSubject.next(value);
  }

  get _statusOffer() {
    return this.statusOfferSubject.getValue();
  }

  public sendMediaChannelsData(newForm: OfferInterface, choiceMethod: string) {
    this.setUnikeID()
    const newOffers: OfferInterface = {
      id: this.setUnikeID(),
      name: newForm.name,
      link: newForm.link,
      brand: newForm.brand,
      payments: newForm.payments,
      payout: choiceMethod,
      balance: newForm.balance,
      vip: false,
      statusOffer: this.rulesOfferMode.getValue()
    }
    this.backendService.setNewOffers(newOffers);

  }

  private setUnikeID(): number {
    let id: number
    this.store.pipe(select(selectOffersData)).subscribe((data) => {
      id = Object.values(data).length + 1;
    })
    return id
  }

}