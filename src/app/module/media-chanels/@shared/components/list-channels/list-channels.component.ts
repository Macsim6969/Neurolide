import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';

import { MediaFormInterface } from '../../interface/mediaForm.interface';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { MediaChannelService } from '../../services/mediaChannel.service';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';
import { MediaChannelsDataClass } from '../../abstract/mediaChannelsData'; 
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { MediaFormService } from '../../services/mediaForm.service';

@Component({
  selector: 'app-list-channels',
  templateUrl: './list-channels.component.html',
  styleUrls: ['./list-channels.component.scss']
})
export class ListChannelsComponent extends MediaChannelsDataClass {
  @Input() statusPage: string;
  public isOpenDropdown: boolean[] = [];
  public isOpen: boolean = false;
  public urls: string;

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override mediaChannelService: MediaChannelService,
    private searchMediaChannelAndOffers: SearchMediaChannelAndOffersService,
    private userSearchService: UserSearchService,
    private mediaFormService: MediaFormService
  ) {
    super(store, globalIconsService, mediaChannelService);
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.checkUrlPage();
    this.streamSearchData();
    this.streamSearchFilterData();
  }

  private checkUrlPage() {
    this.urls = localStorage.getItem('currentRoute').slice(1, -1)
  }

  private streamSearchData() {
    this.searchMediaChannelAndOffers._searchText$.pipe(takeUntil(this.destroy$)).subscribe((data: string) => {
      if (data && this.mainData) {
        this.mediaChannels = Object.values(this.mainData).filter((e: MediaFormInterface) => e.name.toLocaleLowerCase().includes(data.toLocaleLowerCase()))
      } else if (this.mainData) {
        this.mediaChannels = Object.values(this.mainData);
      }
    })
  }

  private streamSearchFilterData() {
    this.userSearchService._searchData$.pipe(takeUntil(this.destroy$)).subscribe((selectedField) => {
      const sortDirection = this.userSearchService.getSortDirection(selectedField);
      this.mediaChannels ? this.mediaChannels.sort((a, b) => {
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

  private getFieldValue(user: MediaFormInterface, field: string): any {
    switch (field) {
      case 'name':
        return user.name || '';
      case 'userID':
        return user.id || '';
      case 'link':
        return user.link || '';
      case 'subscribers':
        return user.subscribe || 0; // Ensure numeric comparison
      case 'stream':
        return user.stream || 0; // Ensure numeric comparison
      case 'payout':
        return user.payout || 0;  // Ensure numeric comparison
      case 'price':
        return user.price || 0;  // Ensure numeric comparison
      case 'vip':
        return user.vip;  // Ensure boolean comparison
      default:
        return null;
    }
  }

  public changeMedia(index: string) {
    if (this.rules === 'manager') {
      const media = this.mediaChannels.find((e: MediaFormInterface) => e.id === index)
      this.mediaFormService._mediaData = media;
      this.mediaFormService._statusMOde = 'edite'
      this.mediaFormService._isMediaForm = true;
    }
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
