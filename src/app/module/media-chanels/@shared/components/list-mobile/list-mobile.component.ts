import { Component, OnInit } from '@angular/core';
import { MediaChannelsDataClass } from '../../abstract/mediaChannelsData';
import { StoreInterface } from '../../../../../store/model/store.model';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { MediaChannelService } from '../../services/mediaChannel.service';
import { Store } from '@ngrx/store';
import { MediaFormService } from '../../services/mediaForm.service';

@Component({
  selector: 'app-list-mobile',
  templateUrl: './list-mobile.component.html',
  styleUrls: ['./list-mobile.component.scss', '../../../../../../style/offers&channels.scss']
})
export class ListMobileComponent extends MediaChannelsDataClass implements OnInit {
  public activeSlide: number = 0;
  public rules: string;

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override mediaChannelService: MediaChannelService,
    private mediaFormService: MediaFormService
  ) {
    super(store, globalIconsService, mediaChannelService);
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.checkRulesUser();
  }

  private checkRulesUser(){
    this.rules = JSON.parse(localStorage.getItem('rules'))
  }

  public changeActiveCard(event: number) {
    this.activeSlide = event;
  }

  public openForm() {
    this.mediaFormService._isMediaForm = true;
  }

  public choicePayout(index: number, value: 'CPM' | 'CPH', id) {
    if (!this.activePayout[index]) {
      this.activePayout[index] = '';
    }
    this.activePayout[index] = value;
    this.mediaChannelService.setNewChanges(this.mediaChannels, this.mainData, id, this.activePayout[index])
  }
}
