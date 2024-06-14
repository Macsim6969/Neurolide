import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CardsPayment } from "../../../../shared/interfaces/backend.interface";
import { BackendService } from "../../../../shared/services/backend.service";


@Injectable()

export class BalanceCardService {

  private isOpenAddCardPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private backendService: BackendService
  ) { }

  set _isAddCard(value: boolean) {
    this.isOpenAddCardPopupSubject.next(value);
  }

  get _isAddCard$() {
    return this.isOpenAddCardPopupSubject;
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