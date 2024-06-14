import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CardsPayment } from "../../../../shared/interfaces/backend.interface";
import { BackendService } from "../../../../shared/services/backend.service";


@Injectable()

export class BalanceActionService {

  private isAddMoneyPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isTakeOutMoneyPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private backendService: BackendService
  ) { }

  set _isAddedMoney(value: boolean) {
    this.isAddMoneyPopupSubject.next(value);
  }

  get _isAddedMoney$() {
    return this.isAddMoneyPopupSubject;
  }

  set _isTakeOutdMoney(value: boolean) {
    this.isTakeOutMoneyPopupSubject.next(value);
  }

  get _isTakeOutdMoney$() {
    return this.isTakeOutMoneyPopupSubject;
  }

  public setNewCard(form) {
    const id = JSON.parse(localStorage.getItem('id'))
    const newCard: CardsPayment = {
      name: form.name,
      data: form.data,
      cvc: form.cvc,
      balance: 0,
      number: form.numberCard,
      type: 'Visa',
      numberPhone: form.number
    }

    this.backendService.setCardsPayment(id, newCard)

  }

}