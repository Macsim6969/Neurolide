import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { MediaFormService } from "../../../module/media-chanels/@shared/services/mediaForm.service";
import { IsMobilePage } from "../mobilePage/mobilePage";

@Component({
  template: ''
})
export abstract class MediaChannelsForm extends IsMobilePage implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isOpenForm: boolean;

  constructor(
    protected mediaFormService: MediaFormService
  ) {
    super();
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
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