import { Component, OnDestroy, OnInit } from '@angular/core';

import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { MediaFormService } from '../../services/mediaForm.service';
import { Subject } from 'rxjs';
import { UserSearchService } from '../../../../../shared/services/userSearch.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';

@Component({
  selector: 'app-media-header',
  templateUrl: './media-header.component.html',
  styleUrls: ['./media-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class MediaHeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public active: number = 0;
  public isActive: boolean[];
  constructor(
    private globalIcon: GlobalIconsService,
    private mediaFormService: MediaFormService,
    private searchMediaChannelAndOffers: SearchMediaChannelAndOffersService,
    private userSearch: UserSearchService
  ) { }

  ngOnInit(): void {
    
  }

  public toogleFilter(i: number, tag: string) {
    this.isActive = []
    if (i === this.active) {
      this.active = null;
      this.isActive[i] = false;
      this.userSearch._searchData = '';
    } else {
      this.active = i;
      this.isActive[i] = true;
      this.userSearch._searchData = tag;
    }

  }

  public openForm() {
    this.mediaFormService._isMediaForm = true;
  }

  public changeData(event: any) {
    this.searchMediaChannelAndOffers._searchText = event.target.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
