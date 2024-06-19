import { Component, OnDestroy, OnInit } from "@angular/core";
import { GlobalIconsService } from "../../../../shared/services/globalIcon.service";
import { StoreInterface } from "../../../../store/model/store.model";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { MediaFormInterface } from "../interface/mediaForm.interface";
import { selectMediaChannels } from "../../../../store/selectors/store.selectors";
import { MediaChannelService } from "../services/mediaChannel.service";

@Component({
  template: ''
})

export abstract class MediaChannelsDataClass implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();
  protected mainData: MediaFormInterface[];
  public mediaChannels: MediaFormInterface[];
  protected activePayout: string[] = [];
  constructor(
    protected store: Store<{ store: StoreInterface }>,
    protected globalIconsService: GlobalIconsService,
    protected mediaChannelService: MediaChannelService,
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