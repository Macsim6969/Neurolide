import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { CardsPayment } from "../../interfaces/backend.interface";
import { Store, select } from "@ngrx/store";
import { StoreInterface } from "../../../store/model/store.model";
import { BalanceCardService } from "../../services/balance/balanceCard.service";
import { selectCardsPayments } from "../../../store/selectors/store.selectors";

@Component({
  template: ''
})

export abstract class BasePaymentComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public cards: CardsPayment[];
  public activeCard: number = 0;
  public rules: string;
  constructor(
    protected store: Store<{ store: StoreInterface }>,
    protected balanceCard: BalanceCardService
  ) { }

  ngOnInit(): void {
    this.initializeUserCardsPayment();
  }

  private initializeUserCardsPayment() {
    this.store.pipe(select(selectCardsPayments), takeUntil(this.destroy$)).subscribe((data: CardsPayment[]) => {
      if (data) {
        this.cards = Object.values(data);
        console.log(data)
      }
    })
  }

  public copyToClipboard(text: number): void {
    const textField = document.createElement('textarea');
    textField.innerText = text.toString();
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  public openCardPopup() {
    this.balanceCard._isAddCard = true;
    if (this.rules !== 'brand' && this.rules !== 'afiliat') {
      document.body.style.overflow = 'hidden';
      // this.cardPopup = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}