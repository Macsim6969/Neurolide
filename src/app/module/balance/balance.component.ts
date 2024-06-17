import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../shared/services/backend.service';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { BalanceCardService } from '../../shared/services/balance/balanceCard.service';
import { CardsconService } from '../../shared/services/balance/cardsIcon.service';
import { BalanceActionService } from '../../shared/services/balance/balanceAction.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public isAddedCard: boolean;
  public isAddedMoney: boolean;
  public isTakeOutMoney: boolean;

  constructor(
    private backendService: BackendService,
    private cardsIconService: CardsconService,
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
