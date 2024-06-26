import { Component, OnInit } from '@angular/core';
import { OfferFormService } from './@shared/services/offersForms.service';
import { OffersOpenForm } from '../../shared/abstract/offers/offersOpenForm';
import { NavigationIconsService } from '../../shared/services/navigation/navigationIcon.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent extends OffersOpenForm implements OnInit {
  public rules: string;
  constructor(
    override offerFormService: OfferFormService,
    private navigationIconsService: NavigationIconsService
  ) {
    super(offerFormService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkRulesUser();
  }

  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'));
  }

  public openForm(rules: 'added' | 'offers' | 'active') {
    this.offerFormService._isOfferForm = true;
    this.offerFormService._rulesOffer = rules;
  }
}
