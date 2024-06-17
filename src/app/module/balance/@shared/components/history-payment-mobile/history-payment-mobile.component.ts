import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { TranslateService } from '@ngx-translate/core';
import { HistoryClass } from '../../history';

@Component({
  selector: 'app-history-payment-mobile',
  templateUrl: './history-payment-mobile.component.html',
  styleUrls: ['./history-payment-mobile.component.scss']
})
export class HistoryPaymentMobileComponent extends HistoryClass {


  constructor(
    override store: Store<{ store: StoreInterface }>,
    override translate: TranslateService
  ) {
    super(store, translate)
  }



}
