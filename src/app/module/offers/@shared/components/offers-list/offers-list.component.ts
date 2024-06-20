import { Component } from '@angular/core';
import { OffersDataClass } from '../../abstract/offersData';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OffersService } from '../../services/offers.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { takeUntil } from 'rxjs';
import { OfferInterface } from '../../interface/offer.interface';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent extends OffersDataClass {
  public isOpenDropdown: boolean[] = [];
  public isOpen: boolean = false;
  public activeChannel: number;

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    private searchMediaChannelAndOffers: SearchMediaChannelAndOffersService
  ) {
    super(store, globalIconsService, offersService);
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.streamSearchData();
  }

  private streamSearchData() {
    this.searchMediaChannelAndOffers._searchText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data && this.mainData) {
        this.offers = Object.values(this.mainData).filter((e: OfferInterface) => e.name.toLocaleLowerCase().includes(data.toLocaleLowerCase()))
      } else if (this.mainData) {
        this.offers = Object.values(this.mainData);
      }
    })
  }

  public selectChannel(index: number) {
    this.activeChannel = index;
  }

  public openPayout(index: number) {
    this.isOpenDropdown = [];
    this.isOpen = !this.isOpen;
    this.isOpenDropdown[index] = true;
  }

  public choicePayout(index: number, value: 'CPM' | 'CPH') {
    if (!this.activePayout[index]) {
      this.activePayout[index] = '';
    }
    this.activePayout[index] = value;
    this.isOpenDropdown = null;
  }

}
