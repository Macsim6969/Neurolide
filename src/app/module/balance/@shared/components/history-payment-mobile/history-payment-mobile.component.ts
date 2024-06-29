import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { TranslateService } from '@ngx-translate/core';
import { HistoryClass } from '../../history';
import { takeUntil } from 'rxjs';
import { AdddedCardData, HistoryPayment } from '../../interface/addCard.interface';

@Component({
  selector: 'app-history-payment-mobile',
  templateUrl: './history-payment-mobile.component.html',
  styleUrls: ['./history-payment-mobile.component.scss']
})
export class HistoryPaymentMobileComponent extends HistoryClass implements OnInit {

  public historyPayment: HistoryPayment;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override translate: TranslateService
  ) {
    super(store, translate)
  }

  override ngOnInit(): void {
    this.streamAddedCardData();
  }

  private streamAddedCardData() {
    this.translate.stream('balance.historyPayment').pipe(takeUntil(this.destroy$))
      .subscribe((data: HistoryPayment) => {
        this.historyPayment = data;
      })
  }

}
