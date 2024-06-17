import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { BalanceCardService } from '../../shared/services/balance/balanceCard.service';
import { BasePaymentComponent } from '../../shared/abstract/payment/payment';
import { GlobalIconsService } from '../../shared/services/globalIcon.service';

@Component({
  selector: 'app-cards-payment-mobile',
  templateUrl: './cards-payment-mobile.component.html',
  styleUrls: ['./cards-payment-mobile.component.scss', '../../shared/abstract/payment/payment.scss']
})
export class CardsPaymentMobileComponent extends BasePaymentComponent {
  public isLeft: boolean;
  public isRight: boolean;
  public override activeCard: number;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override balanceCard: BalanceCardService,
    private globalIconsService: GlobalIconsService
  ) {
    super(store, balanceCard);
  }

  public left() {
    if (this.activeCard === 0) {
      this.isLeft = true;
      this.isRight = false;
      return
    } else {
      this.isRight = false;
      this.isLeft = false;
      this.activeCard--;
    }
  }

  public right() {
    if (this.activeCard === this.cards.length - 1) {
      this.isRight = true;
      this.isLeft = false;
      return
    } else {
      this.isLeft = false;
      this.isRight = false;
      this.activeCard++
    }
  }

  public choiceCard(id: number, idCard: number) {
    // this.usersCard._userActiveCard = id;
    // this.activeCard = idCard;
  }
}
