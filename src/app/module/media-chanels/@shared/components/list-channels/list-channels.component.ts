import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectMediaChannels } from '../../../../../store/selectors/store.selectors';
import { MediaFormInterface } from '../../interface/mediaForm.interface';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { MediaChannelService } from '../../services/mediaChannel.service';

@Component({
  selector: 'app-list-channels',
  templateUrl: './list-channels.component.html',
  styleUrls: ['./list-channels.component.scss']
})
export class ListChannelsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public mediaChannels: MediaFormInterface[];
  public isOpenDropdown: boolean[] = [];
  public isOpen: boolean = false;
  public activeChannel: number;
  public activePayout: string[] = [];

  private mainData: MediaFormInterface[];
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private globalIconsService: GlobalIconsService,
    private mediaChannelService: MediaChannelService
  ) { }

  ngOnInit(): void {
    this.streamMediaChannelsDataFromStore();
  }

  private streamMediaChannelsDataFromStore() {
    this.store.select(selectMediaChannels).pipe(takeUntil(this.destroy$))
      .subscribe((data: MediaFormInterface[]) => {
        if (data) {
          this.mainData = data;
          this.mediaChannels = Object.values(data);
        }
      });
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

  public removeMedia(id: string) {
    this.mediaChannelService.removeMedia(this.mediaChannels, this.mainData, id)
  }

  public setNewChanges(id: string, idChannel: number) {
    this.mediaChannelService.setNewChanges(this.mediaChannels, this.mainData, id, this.activePayout[idChannel])

  }

  public setVipStatus(id: string) {
    this.mediaChannelService.setVipStatus(this.mediaChannels, this.mainData, id)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
