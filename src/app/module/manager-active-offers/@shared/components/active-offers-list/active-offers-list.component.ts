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
import { selectActiveOffers, selectOffersData } from '../../../../../store/selectors/store.selectors';
import { ActiveOfferService } from '../../../../offers/@shared/services/activeOffer.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-active-offers-list',
  templateUrl: './active-offers-list.component.html',
  styleUrls: ['./active-offers-list.component.scss']
})
export class ActiveOffersListComponent extends OffersList implements OnInit {
  public activeOffers: OfferInterface[];
  private activeOffersDop: OfferInterface[];
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
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.streamOffersDataFromStore();
  }

  override streamOffersDataFromStore(): void {
    this.store.pipe(select(selectOffersData), takeUntil(this.destroy$)).subscribe((data) => {
      if (Object.values(data).filter((e) => e.statusOffer === 'active')) {
        this.activeOffers = Object.values(data).filter((e) => e.statusOffer === 'active');
        this.activeOffersDop = Object.values(data);
        this.activeOfferService._activeOfferData = data;
      }

    })
  }

  protected override streamSearchData(): void {
    this.searchMediaChannelAndOffers._searchText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data) {
        this.activeOffers = this.activeOffersDop.filter((e: OfferInterface) => e.name.toLocaleLowerCase().includes(data.toLocaleLowerCase()));
      } else {
        this.activeOffers = this.activeOffersDop;
      }
    })
  }
}
