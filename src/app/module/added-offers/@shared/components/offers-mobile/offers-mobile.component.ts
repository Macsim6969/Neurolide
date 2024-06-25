import { Component, OnInit } from '@angular/core';
import { OffersDataClass } from '../../abstract/offersData';
import { Store } from '@ngrx/store';
import { OffersService } from '../../services/offers.service';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { StoreInterface } from '../../../../../store/model/store.model';
import { OfferFormService } from '../../services/offersForms.service';

@Component({
  selector: 'app-offers-mobile',
  templateUrl: './offers-mobile.component.html',
  styleUrls: ['./offers-mobile.component.scss', '../../../../../../style/offers&channels.scss']
})
export class OffersMobileComponent extends OffersDataClass implements OnInit {
  public activeSlide: number = 0;
  public rules: string;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    private offerFormService: OfferFormService
  ) {
    super(store, globalIconsService, offersService);
    super.ngOnInit();
  }
  override ngOnInit(): void {
    this.checkRulesUser(); 
  }

  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'))
  }

  public changeActiveCard(event: number) {
    this.activeSlide = event;
  }

  public openForm() {
    this.offerFormService._isOfferForm = true;
  }

  public goToWork(idOffer: number){
    this.offersService.setOfferToWork(this.mainData, idOffer);
 }
}
