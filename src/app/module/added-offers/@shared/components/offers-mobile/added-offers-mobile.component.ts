import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { StoreInterface } from '../../../../../store/model/store.model';
import { OffersService } from '../../../../offers/@shared/services/offers.service';
import { OfferFormService } from '../../../../offers/@shared/services/offersForms.service';
import { OffersDataClass } from '../../../../offers/@shared/abstract/offersData';
import { OfferInterface, OffersFormsData } from '../../../../offers/@shared/interface/offer.interface';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, takeUntil } from 'rxjs';
import { ModelPaymentInterface } from '../../../../offers/@shared/interface/model.interface';

@Component({
  selector: 'app-added-offers-mobile',
  templateUrl: './added-offers-mobile.component.html',
  styleUrls: ['./added-offers-mobile.component.scss', '../../../../../../style/offers&channels.scss']
})
export class AddedOffersMobileComponent extends OffersDataClass implements OnInit {
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  public url: string;
  public modelPayment: ModelPaymentInterface[];
  public formData: OffersFormsData;
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    private offerFormService: OfferFormService,
    private translate: TranslateService
  ) {
    super(store, globalIconsService, offersService);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.streamModelPaymentAndDataFromJson();
    this.checkRoutePage();
  }

  private streamModelPaymentAndDataFromJson() {
    combineLatest(([this.translate.stream('offers.offerModel'),  this.translate.stream('offers.form')])).pipe(takeUntil(this.destroy$)).subscribe(([dataModel, dataForm]) =>{
      this.modelPayment = dataModel;
      this.formData = dataForm;
    })
  }

  private checkRoutePage() {
    this.url = localStorage.getItem('currentRoute')
  }

  public goToWork(idOffer: number) {
    this.offersService.setOfferToWork(this.mainData, idOffer);
  }

  public changeOffers(index: number) {
    const media = this.offers?.find((e: OfferInterface) => e.id === index);
    this.offerFormService._offerData = media;
    this.offerFormService._statusMOde = 'edite';
    this.offerFormService._isOfferForm = true;
  }

}
