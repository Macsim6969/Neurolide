import { Component, OnInit } from '@angular/core';
import { OffersOpenForm } from '../../shared/abstract/offers/offersOpenForm';
import { OfferFormService } from '../offers/@shared/services/offersForms.service';
import { GlobalIconsService } from '../../shared/services/globalIcon.service';
import { NavigationIconsService } from '../../shared/services/navigation/navigationIcon.service';

@Component({
  selector: 'app-added-offers',
  templateUrl: './added-offers.component.html',
  styleUrls: ['./added-offers.component.scss']
})
export class AddedOffersComponent extends OffersOpenForm implements OnInit{
  public url: string;
  constructor(
    override offerFormService: OfferFormService,
    private globalIcon: GlobalIconsService,
    private navigationIconsService: NavigationIconsService
  ) {
    super(offerFormService);
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.checkRoutePage();
  }

  private checkRoutePage(){
    this.url = localStorage.getItem('currentRoute')
  }

  public openForm(rules: 'added' | 'offers' | 'active') {
    this.offerFormService._isOfferForm = true;
    this.offerFormService._rulesOffer = rules;
  }
}
