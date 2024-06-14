import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../shared/services/backend.service';
import { CardsconService } from './@shared/services/cardsIcon.service';
import { BalanceCardService } from './@shared/services/balanceCard.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public isAddedCard: boolean;

  constructor(
    private backendService: BackendService,
    private cardsIconService: CardsconService,
    private balanceCard: BalanceCardService
  ) { }

  ngOnInit(): void {
    this.getCardsPaymentDataFromStore();
    this.streamOpenPopup();
  }

  private getCardsPaymentDataFromStore() {
    const userId = JSON.parse(localStorage.getItem('id'))
    this.backendService.getCardsPayment(userId);
  }

  private streamOpenPopup() {
    this.balanceCard._isAddCard$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isAddedCard = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
