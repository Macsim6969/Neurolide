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
import { ActiveOfferService } from '../../../../offers/@shared/services/activeOffer.service';
import { selectActiveOffers, selectOffersData } from '../../../../../store/selectors/store.selectors';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-works-offers-list',
  templateUrl: './works-offers-list.component.html',
  styleUrls: ['./works-offers-list.component.scss']
})
export class WorksOffersListComponent extends OffersList implements OnInit {
  // public rules: string;
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
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkRulesAndUrlUser();
    this.streamOffersDataFromStore();
  }

  protected override streamSearchData(): void {
    this.searchMediaChannelAndOffers._searchText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data) {
        this.offerInWork = Object.values(this.mainData).filter((e: OfferInterface) => e.name.toLocaleLowerCase().includes(data.toLocaleLowerCase()));
      } else if (this.mainData) {
        this.offerInWork = Object.values(this.mainData).filter(e => e.isAdvertice);
      }
      console.log(this.offerInWork);
    })
  }

  private checkRulesAndUrlUser() {
    // this.rules = JSON.parse(localStorage.getItem('rules'));
    this.url = localStorage.getItem('currentRoute')
    console.log(this.rules, this.url)
  }

  protected override streamOffersDataFromStore(): void {
    this.store.pipe(select(selectOffersData), takeUntil(this.destroy$)).subscribe((data) => {
      this.offerInWork = Object.values(data).filter((e) => e.isAdvertice === true);
      this.activeOfferService._activeOfferData = data;
      this.mainData = data;
    })
  }

}
