import { Injectable } from "@angular/core";
import { BehaviorSubject, take } from "rxjs";
import { CardsPayment } from "../../../../shared/interfaces/backend.interface";
import { BackendService } from "../../../../shared/services/backend.service";
import { TransactionInterface } from "../interface/transactions.interface";
import { Store, select } from "@ngrx/store";
import { StoreInterface } from "../../../../store/model/store.model";
import { selectCardsPayments } from "../../../../store/selectors/store.selectors";
import { AddMoneyToCard, TakeOutMoney } from "../interface/form.interface";


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
    const id = JSON.parse(localStorage.getItem('id'))
    this.store.pipe(take(1), select(selectCardsPayments)).subscribe((data: CardsPayment[]) => {
      cards = Object.values(data).find(card => card.number === form.numberCard && card.name === form.name);
      if (cards) {
        const key = Object.keys(data).find(key => data[key] === cards);
        const newCard: CardsPayment = {
          ...cards,
          balance: cards.balance - form.suma
        }

        this.backendService.updateCardsPayment(id, key, newCard);
      }


    })

  }

  public addMoneyToCard(form: AddMoneyToCard) {
    let cards: CardsPayment;
    const id = JSON.parse(localStorage.getItem('id'))
    this.store.pipe(take(1), select(selectCardsPayments)).subscribe((data: CardsPayment[]) => {
      cards = Object.values(data).find(card => card.cvc === form.cvc && card.number === form.numberCard && card.name === form.name && card.data === form.data && card.numberPhone === form.number);

      if (cards) {

        const key = Object.keys(data).find(key => data[key] === cards);
        const newTransaction: TransactionInterface = {
          numberCode: this.generateUniqueId(6),
          dataCard: form.data,
          dataHistory: this.formatDate(new Date()),
          status: 'Straight to',
          card: form.numberCard,
          subscribe: 'Bonus (annual)',
          suma: form.suma
        }

        const newCard: CardsPayment = {
          ...cards,
          balance: cards.balance + form.suma 
        }

        console.log(newCard)
        this.backendService.setCardsTransactions(id, newTransaction);
        this.backendService.updateCardsPayment(id, key, newCard);
      }

    })


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