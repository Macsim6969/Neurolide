import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OffersService } from '../../../../offers/@shared/services/offers.service';
import { OfferFormService } from '../../../../offers/@shared/services/offersForms.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';
import { TranslateService } from '@ngx-translate/core';
import { OffersList } from '../../../../../shared/abstract/offers/offersList';
import { takeUntil } from 'rxjs';
import { OfferInterface } from '../../../../offers/@shared/interface/offer.interface';
import { ActiveOfferService } from '../../../../offers/@shared/services/activeOffer.service';

@Component({
  selector: 'app-added-offers-list',
  templateUrl: './added-offers-list.component.html',
  styleUrls: ['./added-offers-list.component.scss']
})
export class AddedOffersListComponent extends OffersList {
  public addedOffers: OfferInterface[];
  public allAddedOffers: OfferInterface[];
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

}
