import { selectAddedOffers } from './../../../../../store/selectors/store.selectors';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-added-offers-list',
  templateUrl: './added-offers-list.component.html',
  styleUrls: ['./added-offers-list.component.scss']
})
export class AddedOffersListComponent extends OffersList {
  public addedOffers: OfferInterface[];
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    override offersFormService: OfferFormService,
    override searchMediaChannelAndOffers: SearchMediaChannelAndOffersService,
    override userSearchService: UserSearchService,
    override translate: TranslateService
  ) {
    super(store, globalIconsService, offersService, offersFormService, searchMediaChannelAndOffers, userSearchService, translate);
    super.ngOnInit();
  }

  protected override streamOffersDataFromStore(): void {
    this.store.pipe(select(selectAddedOffers), takeUntil(this.destroy$)).subscribe((data) => {
      data ? this.addedOffers = Object.values(data) : null;
    })
  }
}
