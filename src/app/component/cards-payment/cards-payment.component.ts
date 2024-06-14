import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { StoreInterface } from '../../store/model/store.model';
import { selectCardsPayments } from '../../store/selectors/store.selectors';
import { CardsPayment } from '../../shared/interfaces/backend.interface';
import { BalanceCardService } from '../../module/balance/@shared/services/balanceCard.service';

@Component({
  selector: 'app-cards-payment',
  templateUrl: './cards-payment.component.html',
  styleUrls: ['./cards-payment.component.scss']
})
export class CardsPaymentComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public cards: CardsPayment[];
  public activeCard: number = 0;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private balanceCard: BalanceCardService
  ) { }

  ngOnInit(): void {
    this.initializeUserCardsPayment();
  }

  private initializeUserCardsPayment() {
    this.store.pipe(select(selectCardsPayments), takeUntil(this.destroy$)).subscribe((data: CardsPayment[]) => {
      this.cards = Object.values(data);
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

  public choiceCard(id: number, idCard: number) {
    // this.usersCard._userActiveCard = id;
    // this.activeCard = idCard;
  }

  public openCardPopup() {
    this.balanceCard._isAddCard = true;
    // if (this.rules !== 'brand' && this.rules !== 'afiliat') {
    //   document.body.style.overflow = 'hidden';
    //   this.cardPopup = true;
    // }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
