import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { OfferFormService } from "../../../module/offers/@shared/services/offersForms.service";
import { IsMobilePage } from "../mobilePage/mobilePage";

@Component({
  template: ''
})

export abstract class OffersOpenForm extends IsMobilePage implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isOpenForm: boolean;
  constructor(
    protected offerFormService: OfferFormService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeIsOpenForm();
  }

  private initializeIsOpenForm() {
    this.offerFormService._isOfferForm$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isOpenForm = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}