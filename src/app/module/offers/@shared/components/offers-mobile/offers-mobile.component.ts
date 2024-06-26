import { Component, OnInit } from '@angular/core';
import { OffersDataClass } from '../../abstract/offersData';
import { Store } from '@ngrx/store';
import { OffersService } from '../../services/offers.service';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { StoreInterface } from '../../../../../store/model/store.model';
import { OfferFormService } from '../../services/offersForms.service';
import { takeUntil } from 'rxjs';
import { ModelPaymentInterface } from '../../interface/model.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-offers-mobile',
  templateUrl: './offers-mobile.component.html',
  styleUrls: ['./offers-mobile.component.scss', '../../../../../../style/offers&channels.scss']
})
export class OffersMobileComponent extends OffersDataClass implements OnInit {
  public activeSlide: number = 0;
  public modelPayment: ModelPaymentInterface[];
  public url: string;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    private offerFormService: OfferFormService,
    private translate: TranslateService
  ) {
    super(store, globalIconsService, offersService);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.streamModelPaymentFromJson();
    this.checkRulesUser(); 
  }

  private streamModelPaymentFromJson() {
    this.translate.stream('offers.offerModel').pipe(takeUntil(this.destroy$)).subscribe((data: ModelPaymentInterface[]) => {
      this.modelPayment = data;
    }) 
  }
  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'))
    this.url = localStorage.getItem('currentRoute');
  }

  public changeActiveCard(event: number) {
    this.activeSlide = event;
  }

  public openForm() {
    this.offerFormService._isOfferForm = true;
  }

  public choicePayout(index: number, value: string, idOffer: number,) {
    if (!this.activePayout[index]) {
      this.activePayout[index] = '';
    }
    this.activePayout[index] = value;
    this.setNewChanges(idOffer, value);
  }

  public goToWork(idOffer: number){
    this.offersService.setOfferToWork(this.mainData, idOffer);
 }
}
