import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MediaFormService } from './@shared/services/mediaForm.service';

@Component({
  selector: 'app-media-chanels',
  templateUrl: './media-chanels.component.html',
  styleUrls: ['./media-chanels.component.scss']
})
export class MediaChanelsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isOpenForm: boolean;

  constructor(
    private mediaFormService: MediaFormService
  ) { }

  ngOnInit(): void {
    this.initializeIsOpenForm();
  }

  private initializeIsOpenForm() {
    this.mediaFormService._isMediaForm$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isOpenForm = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
