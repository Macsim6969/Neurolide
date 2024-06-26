import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { StoreInterface } from '../../../../../store/model/store.model';
import { OffersService } from '../../../../offers/@shared/services/offers.service';
import { OfferFormService } from '../../../../offers/@shared/services/offersForms.service';
import { OffersDataClass } from '../../../../offers/@shared/abstract/offersData';
import { OfferInterface } from '../../../../offers/@shared/interface/offer.interface';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { selectActiveOffers } from '../../../../../store/selectors/store.selectors';
import { takeUntil } from 'rxjs';
import { ActiveOfferService } from '../../../../offers/@shared/services/activeOffer.service';

@Component({
  selector: 'app-active-offers-mobile',
  templateUrl: './active-offers-mobile.component.html',
  styleUrls: ['./active-offers-mobile.component.scss', '../../../../../../style/offers&channels.scss']
})
export class ActiveOffersMobileComponent extends OffersDataClass implements OnInit {
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  // public rules: string;
  public activeOffers: OfferInterface[];
  constructor(
    override store: Store<{ store: StoreInterface }>,
    override globalIconsService: GlobalIconsService,
    override offersService: OffersService,
    private offerFormService: OfferFormService,
    private activeOfferService: ActiveOfferService
  ) {
    super(store, globalIconsService, offersService);
    super.ngOnInit();
  }
  override ngOnInit(): void {
    this.checkRulesUser(); 
  }

  protected override streamOffersDataFromStore(): void {
    this.store.pipe(select(selectActiveOffers), takeUntil(this.destroy$)).subscribe((data) => {
      this.activeOffers = Object.values(data);
      this.activeOfferService._activeOfferData = data;
    })
  }

  private checkRulesUser() {
    // this.rules = JSON.parse(localStorage.getItem('rules'))
  }

  public goToWork(idOffer: number){
    this.offersService.setOfferToWork(this.mainData, idOffer);
 }

 public changeOffers(index: number) {
  const media = this.offers?.find((e: OfferInterface) => e.id === index);
  this.offerFormService._offerData = media;
  this.offerFormService._statusMOde = 'edite';
  this.offerFormService._isOfferForm = true;
}
 
}
