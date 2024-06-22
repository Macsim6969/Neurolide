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
import { OfferInterface } from '../../../../offers/@shared/interface/offer.interface';
import { selectActiveOffers } from '../../../../../store/selectors/store.selectors';
import { ActiveOfferService } from '../../../../offers/@shared/services/activeOffer.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-active-offers-list',
  templateUrl: './active-offers-list.component.html',
  styleUrls: ['./active-offers-list.component.scss']
})
export class ActiveOffersListComponent extends OffersList {
  public activeOffers: OfferInterface[];
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

  protected override streamOffersDataFromStore(): void {
    this.store.pipe(select(selectActiveOffers), takeUntil(this.destroy$)).subscribe((data) => {
      this.activeOffers = Object.values(data);
      this.activeOfferService._activeOfferData = data;
    })
  }
}