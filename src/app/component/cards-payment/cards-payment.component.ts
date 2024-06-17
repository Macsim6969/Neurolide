import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { BalanceCardService } from '../../shared/services/balance/balanceCard.service';
import { BasePaymentComponent } from '../../shared/abstract/payment/payment';

@Component({
  selector: 'app-cards-payment',
  templateUrl: './cards-payment.component.html',
  styleUrls: ['./cards-payment.component.scss', '../../shared/abstract/payment/payment.scss']
})
export class CardsPaymentComponent extends BasePaymentComponent {

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override balanceCard: BalanceCardService
  ) {
    super(store, balanceCard);
  }


  public choiceCard(id: number, idCard: number) {
    // this.usersCard._userActiveCard = id;
    // this.activeCard = idCard;
  }


}
