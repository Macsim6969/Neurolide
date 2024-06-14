import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { BalanceData } from '../../interface/balance.interface';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectCardsPayments } from '../../../../../store/selectors/store.selectors';
import { CardsPayment } from '../../../../../shared/interfaces/backend.interface';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss']
})
export class BalanceCardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public balanceData: BalanceData[];
  public totalBalance: number;

  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.streamBalanceDataFromJSON();
    this.initializeCardDataFromStore();
  }

  private streamBalanceDataFromJSON() {
    this.translate.stream('balance.balanceData').pipe(takeUntil(this.destroy$)).subscribe((data: BalanceData[]) => {
      this.balanceData = data;
    })
  }

  private initializeCardDataFromStore() {
    this.store.pipe(select(selectCardsPayments), takeUntil(this.destroy$)).subscribe((data: CardsPayment[]) => {
      if (data) {
        this.totalBalance = Object.values(data).reduce((acc, data) => acc + +data.balance, 0);
      }
      console.log(this.totalBalance)
    });
  }


  public openPopup(tage: string) {
    if (tage === 'top-up') {

    } else if (tage === 'take-out') {

    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
