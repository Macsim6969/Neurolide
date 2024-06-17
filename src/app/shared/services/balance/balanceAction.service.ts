import { Injectable } from "@angular/core";
import { BehaviorSubject, take } from "rxjs";

import { Store, select } from "@ngrx/store";



import { BackendService } from "../backend.service";
import { CardsPayment } from "../../interfaces/backend.interface";
import { AddMoneyToCard, TakeOutMoney } from "../../../module/balance/@shared/interface/form.interface";
import { StoreInterface } from "../../../store/model/store.model";
import { selectCardsPayments } from "../../../store/selectors/store.selectors";
import { TransactionInterface } from "../../../module/balance/@shared/interface/transactions.interface";


@Injectable()

export class BalanceActionService {
  private usedIds: Set<string> = new Set();
  private isAddMoneyPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isTakeOutMoneyPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private backendService: BackendService,
    private store: Store<{ store: StoreInterface }>
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

  public takeOutMoneyFromCard(form: TakeOutMoney) {
    let cards: CardsPayment;
    this.store.pipe(take(1), select(selectCardsPayments)).subscribe((data: CardsPayment[]) => {
      cards = Object.values(data).find(card => card.number === form.numberCard && card.name === form.name);
      if (cards) {
        this.setData(form, data, cards)
      }
    })

  }

  public addMoneyToCard(form: AddMoneyToCard) {
    let cards: CardsPayment;
    this.store.pipe(take(1), select(selectCardsPayments)).subscribe((data: CardsPayment[]) => {
      cards = Object.values(data).find(card => card.cvc === form.cvc && card.number === form.numberCard && card.name === form.name && card.data === form.data && card.numberPhone === form.number);

      if (cards) {
        this.setData(form, data, cards);
      }
    })


  }

  private setData(form, data, cards) {
    const id = JSON.parse(localStorage.getItem('id'))
    const key = Object.keys(data).find(key => data[key] === cards);
    const newTransaction: TransactionInterface = {
      numberCode: this.generateUniqueId(6),
      dataCard: cards.data,
      dataHistory: this.formatDate(new Date()),
      status: 'Straight to',
      card: form.numberCard,
      subscribe: 'Bonus (annual)',
      suma: form.suma
    }
    console.log(newTransaction)
    const newCard: CardsPayment = {
      ...cards,
      balance: cards.balance - form.suma
    }
    this.backendService.setCardsTransactions(id, newTransaction);
    this.backendService.updateCardsPayment(id, key, newCard);
    console.log(newCard, newTransaction)
  }

  private generateUniqueId(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    do {
      id = '';
      for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this.usedIds.has(id));

    this.usedIds.add(id);
    return id.toLocaleUpperCase();
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

}