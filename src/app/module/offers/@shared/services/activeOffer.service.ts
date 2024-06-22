import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OfferInterface } from "../interface/offer.interface";

@Injectable()

export class ActiveOfferService {
  private activeOfferData: BehaviorSubject<OfferInterface[]> = new BehaviorSubject<OfferInterface[]>(null);

  set _activeOfferData(value: OfferInterface[]){
    this.activeOfferData.next(value);
  }

  get _activeOfferData(){
    return this.activeOfferData.getValue();
  }
}