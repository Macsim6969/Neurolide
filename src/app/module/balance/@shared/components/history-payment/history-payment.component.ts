import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { TranslateService } from '@ngx-translate/core';
import { HistoryClass } from '../../history';

@Component({
  selector: 'app-history-payment',
  templateUrl: './history-payment.component.html',
  styleUrls: ['./history-payment.component.scss']
})
export class HistoryPaymentComponent extends HistoryClass {


  constructor(
    override store: Store<{ store: StoreInterface }>,
    override translate: TranslateService
  ) {
    super(store, translate)
  }

}
