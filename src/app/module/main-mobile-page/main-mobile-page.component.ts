import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardsconService } from '../../shared/services/balance/cardsIcon.service';
import { Subject, combineLatest, take, takeUntil } from 'rxjs';
import { BalanceCardService } from '../../shared/services/balance/balanceCard.service';
import { BalanceActionService } from '../../shared/services/balance/balanceAction.service';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectUserData } from '../../store/selectors/store.selectors';
import { UserData } from '../../shared/interfaces/backend.interface';

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
  public userName: string;

  constructor(
    private cardsIcon: CardsconService,
    private balanceCard: BalanceCardService,
    private balanceAction: BalanceActionService,
    private store: Store<{store: StoreInterface}>
  ) { }

  ngOnInit(): void {
    this.streamOpenPopup();
    this.getUserNameFromStore();
  }
  private streamOpenPopup() {
    combineLatest(([this.balanceCard._isAddCard$, this.balanceAction._isAddedMoney$, this.balanceAction._isTakeOutdMoney$]))
      .pipe(takeUntil(this.destroy$)).subscribe(([isAddedCard, isAddedMoney, isTakeOutMoney]) => {
        this.isAddedCard = isAddedCard;
        this.isAddedMoney = isAddedMoney;
        this.isTakeOutMoney = isTakeOutMoney;
      })
  }


  private getUserNameFromStore(){
    this.store.pipe(select(selectUserData), take(1)).subscribe((data: UserData) =>{
      this.userName = data.name;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
