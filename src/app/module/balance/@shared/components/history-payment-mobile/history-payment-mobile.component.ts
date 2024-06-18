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
  
  public activeCard: number = 0;
  public isLeft: boolean;
  public isRight: boolean;

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override translate: TranslateService
  ) {
    super(store, translate)
  }

  changeActiveCard(id: number){
    this.activeCard = id;
  }



}
