import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardsconService } from '../../shared/services/balance/cardsIcon.service';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { BalanceCardService } from '../../shared/services/balance/balanceCard.service';
import { BalanceActionService } from '../../shared/services/balance/balanceAction.service';

@Component({
  selector: 'app-main-mobile-page',
  templateUrl: './main-mobile-page.component.html',
  styleUrls: ['./main-mobile-page.component.scss']
})
export class MainMobilePageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isAddedCard: boolean;
  public isAddedMoney: boolean;
  public isTakeOutMoney: boolean;

  constructor(
    private cardsIcon: CardsconService,
    private balanceCard: BalanceCardService,
    private balanceAction: BalanceActionService
  ) { }

  ngOnInit(): void {
    this.streamOpenPopup();
  }
  private streamOpenPopup() {
    combineLatest(([this.balanceCard._isAddCard$, this.balanceAction._isAddedMoney$, this.balanceAction._isTakeOutdMoney$]))
      .pipe(takeUntil(this.destroy$)).subscribe(([isAddedCard, isAddedMoney, isTakeOutMoney]) => {
        this.isAddedCard = isAddedCard;
        this.isAddedMoney = isAddedMoney;
        this.isTakeOutMoney = isTakeOutMoney;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
