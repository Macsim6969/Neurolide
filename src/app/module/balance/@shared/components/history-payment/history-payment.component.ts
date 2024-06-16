import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectCardTransactions } from '../../../../../store/selectors/store.selectors';
import { TransactionInterface, TransactionsData } from '../../interface/transactions.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-history-payment',
  templateUrl: './history-payment.component.html',
  styleUrls: ['./history-payment.component.scss']
})
export class HistoryPaymentComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public transactions: TransactionInterface[];
  public transactionHeader: TransactionsData[];

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.streamTransactionDataFromStoreAndJson();
  }

  private streamTransactionDataFromStoreAndJson() {
    combineLatest([
        this.translate.stream('transactions'),
        this.store.pipe(select(selectCardTransactions))
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([jsonData, storeData]) => {
        this.transactionHeader = Object.values(jsonData);
        this.transactions = Object.values(storeData);
        console.log(Object.values(storeData))
      
    });
}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
