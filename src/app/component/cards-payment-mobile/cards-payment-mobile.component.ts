import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { BalanceCardService } from '../../shared/services/balance/balanceCard.service';
import { BasePaymentComponent } from '../../shared/abstract/payment/payment';
import { GlobalIconsService } from '../../shared/services/globalIcon.service';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-cards-payment-mobile',
  templateUrl: './cards-payment-mobile.component.html',
  styleUrls: ['./cards-payment-mobile.component.scss', '../../shared/abstract/payment/payment.scss']
})
export class CardsPaymentMobileComponent extends BasePaymentComponent {
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  public override activeCard: number;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override balanceCard: BalanceCardService,
    private globalIconsService: GlobalIconsService
  ) {
    super(store, balanceCard);
  }

  chanegActiveCard(id){
    console.log(id)
    this.activeCard = id;
  }

  public choiceCard(id: number, idCard: number) {
    // this.usersCard._userActiveCard = id;
    // this.activeCard = idCard;
  }
}
