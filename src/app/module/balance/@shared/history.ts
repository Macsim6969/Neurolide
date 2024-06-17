import { Component } from "@angular/core";
import { Subject, combineLatest, takeUntil } from "rxjs";
import { TransactionInterface, TransactionsData } from "./interface/transactions.interface";
import { Store, select } from "@ngrx/store";
import { StoreInterface } from "../../../store/model/store.model";
import { TranslateService } from "@ngx-translate/core";
import { selectCardTransactions } from "../../../store/selectors/store.selectors";

@Component({
  template: ''
})

export abstract class HistoryClass {
  protected destroy$: Subject<void> = new Subject<void>();
  public transactions: TransactionInterface[];
  public transactionHeader: TransactionsData[];

  constructor(
    protected store: Store<{ store: StoreInterface }>,
    protected translate: TranslateService
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