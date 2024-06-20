import { Component } from '@angular/core';
import { OffersDataClass } from '../../abstract/offersData';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OffersService } from '../../services/offers.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { takeUntil } from 'rxjs';
import { OfferInterface } from '../../interface/offer.interface';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';
import { TranslateService } from '@ngx-translate/core';
import { ModelPaymentInterface } from '../../interface/model.interface';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent extends OffersDataClass {
  public isOpenDropdown: boolean[] = [];
  public isOpen: boolean = false;
  public activeChannel: number;
  public modelPayment: ModelPaymentInterface[];

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    private searchMediaChannelAndOffers: SearchMediaChannelAndOffersService,
    private userSearchService: UserSearchService,
    private translate: TranslateService
  ) {
    super(store, globalIconsService, offersService);
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.streamModelPaymentFromJson();
    this.streamSearchData();
    this.streamSearchFilterData();
  }

  private streamModelPaymentFromJson() {
    this.translate.stream('offers.offerModel').pipe(takeUntil(this.destroy$)).subscribe((data: ModelPaymentInterface[]) => {
      this.modelPayment = data;
    })
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

  private streamSearchFilterData() {
    this.userSearchService._searchData$.pipe(takeUntil(this.destroy$)).subscribe((selectedField) => {
      const sortDirection = this.userSearchService.getSortDirection(selectedField);
      this.offers ? this.offers.sort((a, b) => {
        let fieldA = this.getFieldValue(a, selectedField);
        let fieldB = this.getFieldValue(b, selectedField);

        let comparison = 0;
        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          comparison = fieldA.localeCompare(fieldB);
        } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          comparison = fieldA - fieldB;
        } else if (typeof fieldA === 'boolean' && typeof fieldB === 'boolean') {
          comparison = (fieldA === fieldB) ? 0 : fieldA ? -1 : 1;
        }

        return sortDirection ? comparison : -comparison;
      }) : null;
    });
  }

  private getFieldValue(user: OfferInterface, field: string): any {
    switch (field) {
      case 'name':
        return user.name || '';
      case 'userID':
        return user.id || '';
      case 'link':
        return user.link || '';
      case 'subscribers':
        return user.brand || ''; // Ensure numeric comparison
      case 'stream':
        return user.payments || 0; // Ensure numeric comparison
      case 'payout':
        return user.balance || 0;  // Ensure numeric comparison
      case 'price':
        return user.payout || 0;  // Ensure numeric comparison
      case 'vip':
        return user.vip;  // Ensure boolean comparison
      default:
        return null;
    }
  }

  public selectChannel(index: number) {
    this.activeChannel = index;
  }

  public openPayout(index: number) {
    this.isOpenDropdown = [];
    this.isOpen = !this.isOpen;
    this.isOpenDropdown[index] = true;
  }

  public choicePayout(index: number, value: string) {
    if (!this.activePayout[index]) {
      this.activePayout[index] = '';
    }
    this.activePayout[index] = value;
    this.isOpenDropdown = null;
  }

}
