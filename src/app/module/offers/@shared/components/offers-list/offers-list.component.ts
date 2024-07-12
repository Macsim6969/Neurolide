import { OfferInterface } from './../../interface/offer.interface';
import { Component, Input } from '@angular/core';
import { OffersDataClass } from '../../abstract/offersData';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OffersService } from '../../services/offers.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { takeUntil } from 'rxjs';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';
import { TranslateService } from '@ngx-translate/core';
import { ModelPaymentInterface } from '../../interface/model.interface';
import { OfferFormService } from '../../services/offersForms.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent extends OffersDataClass {
  @Input() statusPage: string;
  public url: string;

  public isOpenDropdown: boolean[] = [];
  public isOpen: boolean = false;
  public activeChannel: number;
  public modelPayment: ModelPaymentInterface[];

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    private offersFormService: OfferFormService,
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
    this.checkRulesUser();
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

  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'));
    this.url = localStorage.getItem('currentRoute')
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
        return user.brand || '';
      case 'stream':
        return user.payments || 0;
      case 'payout':
        return user.balance || 0;
      case 'price':
        return user.payout || 0;
      case 'vip':
        return user.vip;
      default:
        return null;
    }
  }

  public changeOffers(index: number) {
    const media = this.offers.find((e: OfferInterface) => e.id === index)
    this.offersFormService._offerData = media;
    this.offersFormService._statusMOde = 'edite'
    this.offersFormService._isOfferForm = true;
  }

  public selectChannel(index: number) {
    this.activeChannel = index;
  }

  public openPayout(index: number) {
    this.isOpenDropdown = [];
    this.isOpen = !this.isOpen;
    this.isOpenDropdown[index] = true;
  }

  public choicePayout(index: number, value: string, idOffer: number,) {
    if (!this.activePayout[index]) {
      this.activePayout[index] = '';
    }
    this.activePayout[index] = value;
    this.isOpenDropdown = null;
    this.setNewChanges(idOffer, value);
  }

  public setToActiveOffer(idOffer: number) {
    this.offersService.setOfferToActiveData(idOffer, this.mainData, this.offers);
  }

  public goToWork(idOffer: number) {
    const idUser = JSON.parse(localStorage.getItem('userData'));
    this.offersService.setOfferToWork(this.mainData, idOffer, idUser['localId']);
  }

}
