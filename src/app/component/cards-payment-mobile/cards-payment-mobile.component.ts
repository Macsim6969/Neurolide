import { Component, OnInit, ViewChild } from '@angular/core';
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
export class CardsPaymentMobileComponent extends BasePaymentComponent implements OnInit {
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  public override activeCard: number;
  public url: string;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override balanceCard: BalanceCardService,
    private globalIconsService: GlobalIconsService
  ) {
    super(store, balanceCard);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkPageUrl();
  }

  public checkPageUrl() {
    this.url = localStorage.getItem('currentRoute');
  }

  chanegActiveCard(id) {
    this.activeCard = id;
  }
}
