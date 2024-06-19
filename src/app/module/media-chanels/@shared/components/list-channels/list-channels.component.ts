import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectMediaChannels } from '../../../../../store/selectors/store.selectors';
import { MediaFormInterface } from '../../interface/mediaForm.interface';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';

@Component({
  selector: 'app-list-channels',
  templateUrl: './list-channels.component.html',
  styleUrls: ['./list-channels.component.scss']
})
export class ListChannelsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public mediaChannels: MediaFormInterface[];

  public activeChannel: number;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private globalIconsService: GlobalIconsService
  ) { }

  ngOnInit(): void {
    this.streamMediaChannelsDataFromStore();
  }

  private streamMediaChannelsDataFromStore() {
    this.store.select(selectMediaChannels).pipe(takeUntil(this.destroy$))
      .subscribe((data: MediaFormInterface[]) => {
        data ? this.mediaChannels = Object.values(data) : null;
      })
  }

  public selectChannel(index: number) {
    this.activeChannel = index;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
