import { Component, OnDestroy } from '@angular/core';
import { IsMobilePage } from '../../shared/abstract/mobilePage/mobilePage';
import { Subject, takeUntil } from 'rxjs';
import { OfferFormService } from './@shared/services/offersForms.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent extends IsMobilePage implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public isOpenForm: boolean;

  constructor(
    private offerFormService: OfferFormService
  ) {
    super();
    super.ngOnInit();
  }

  override ngOnInit(): void {
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
