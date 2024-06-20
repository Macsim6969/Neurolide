import { Component } from '@angular/core';
import { MediaChannelsDataClass } from '../../abstract/mediaChannelsData';
import { StoreInterface } from '../../../../../store/model/store.model';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { MediaChannelService } from '../../services/mediaChannel.service';
import { Store } from '@ngrx/store';
import { MediaFormService } from '../../services/mediaForm.service';

@Component({
  selector: 'app-list-mobile',
  templateUrl: './list-mobile.component.html',
  styleUrls: ['./list-mobile.component.scss']
})
export class ListMobileComponent extends MediaChannelsDataClass {
  public activeSlide: number = 0;

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override mediaChannelService: MediaChannelService,
    private mediaFormService: MediaFormService
  ) {
    super(store, globalIconsService, mediaChannelService)
  }

  public changeActiveCard(event: number) {
    this.activeSlide = event;
  }

  public openForm() {
    this.mediaFormService._isMediaForm = true;
  }
}
