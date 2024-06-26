import { Component, OnInit } from '@angular/core';
import { MediaChannelsDataClass } from '../../abstract/mediaChannelsData';
import { StoreInterface } from '../../../../../store/model/store.model';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { MediaChannelService } from '../../services/mediaChannel.service';
import { Store } from '@ngrx/store';
import { MediaFormService } from '../../services/mediaForm.service';
import { MediaFormInterface } from '../../interface/mediaForm.interface';

@Component({
  selector: 'app-list-mobile',
  templateUrl: './list-mobile.component.html',
  styleUrls: ['./list-mobile.component.scss', '../../../../../../style/offers&channels.scss']
})
export class ListMobileComponent extends MediaChannelsDataClass implements OnInit {
  public activeSlide: number = 0;
  public url: string;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override mediaChannelService: MediaChannelService,
    private mediaFormService: MediaFormService
  ) {
    super(store, globalIconsService, mediaChannelService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkUrlPage();
  }

  private checkUrlPage() {
    this.url = localStorage.getItem('currentRoute')
  }

  public changeActiveCard(event: number) {
    this.activeSlide = event;
  }

  public openForm() {
    this.mediaFormService._isMediaForm = true;
  }

  public changeMedia(index: string) {
    if (this.rules === 'manager') {
      const media = this.mediaChannels.find((e: MediaFormInterface) => e.id === index)
      this.mediaFormService._mediaData = media;
      this.mediaFormService._statusMOde = 'edite'
      this.mediaFormService._isMediaForm = true;
    }
  }

  public choicePayout(index: number, value: 'CPM' | 'CPH', id) {
    if (this.rules !== 'affiliate') {
      if (!this.activePayout[index]) {
        this.activePayout[index] = '';
      }
      this.activePayout[index] = value;
      this.mediaChannelService.setNewChanges(this.mediaChannels, this.mainData, id, this.activePayout[index])
    }

  }
}
