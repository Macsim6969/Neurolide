import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { StoreInterface } from '../../../../../store/model/store.model';
import { OffersService } from '../../../../offers/@shared/services/offers.service';
import { OfferFormService } from '../../../../offers/@shared/services/offersForms.service';
import { OffersDataClass } from '../../../../offers/@shared/abstract/offersData';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ModelPaymentInterface } from '../../../../offers/@shared/interface/model.interface';

@Component({
  selector: 'app-works-offers-mobile',
  templateUrl: './works-offers-mobile.component.html',
  styleUrls: ['./works-offers-mobile.component.scss', '../../../../../../style/offers&channels.scss']
})
export class WorksOffersMobileComponent extends OffersDataClass implements OnInit {
  public isMobile: boolean;
  public activeSlide: number = 0;
  public modelPayment: ModelPaymentInterface[];
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    private offerFormService: OfferFormService,
    private translate: TranslateService
  ) {
    super(store, globalIconsService, offersService);
    super.ngOnInit();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.initializeIsMobilePage();
  }

  override ngOnInit(): void {
    this.streamModelPaymentFromJson();
    this.initializeIsMobilePage();

  }

  private initializeIsMobilePage() {
    if (innerWidth < 1124) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
  private streamModelPaymentFromJson() {
    this.translate.stream('offers.offerModel').pipe(takeUntil(this.destroy$)).subscribe((data: ModelPaymentInterface[]) => {
      this.modelPayment = data;
    })
  }

  public changeActiveCard(event: number) {
    this.activeSlide = event;
  }

  public choicePayout(index: number, value: string, idOffer: number,) {
    if (!this.activePayout[index]) {
      this.activePayout[index] = '';
    }
    this.activePayout[index] = value;
    this.setNewChanges(idOffer, value);
  }

  public openForm() {
    this.offerFormService._isOfferForm = true;
  }
}
