import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OffersService } from '../../../../offers/@shared/services/offers.service';
import { OfferFormService } from '../../../../offers/@shared/services/offersForms.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';
import { TranslateService } from '@ngx-translate/core';
import { OffersList } from '../../../../../shared/abstract/offers/offersList';
import { OfferInterface } from '../../../../offers/@shared/interface/offer.interface';
import { ActiveOfferService } from '../../../../offers/@shared/services/activeOffer.service';

@Component({
  selector: 'app-works-offers-list',
  templateUrl: './works-offers-list.component.html',
  styleUrls: ['./works-offers-list.component.scss']
})
export class WorksOffersListComponent extends OffersList implements OnInit{
  public addedOffers: OfferInterface[];
  public allAddedOffers: OfferInterface[];

  public rules: string;
  public url: string;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    override offersFormService: OfferFormService,
    override searchMediaChannelAndOffers: SearchMediaChannelAndOffersService,
    override userSearchService: UserSearchService,
    override translate: TranslateService,
    override activeOfferService: ActiveOfferService
  ) {
    super(store, globalIconsService, offersService, offersFormService, searchMediaChannelAndOffers, userSearchService, translate, activeOfferService);
    super.ngOnInit();
  }

  override ngOnInit(): void {
    
  }

  private checkRulesAndUrlUser(){
    this.rules = JSON.parse(localStorage.getItem('rules'));
    this.url = localStorage.getItem('currentRoute')
  }

}
