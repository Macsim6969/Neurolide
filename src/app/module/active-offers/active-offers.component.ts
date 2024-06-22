import { Component } from '@angular/core';
import { OffersOpenForm } from '../../shared/abstract/offers/offersOpenForm';
import { OfferFormService } from '../offers/@shared/services/offersForms.service';

@Component({
  selector: 'app-active-offers',
  templateUrl: './active-offers.component.html',
  styleUrls: ['./active-offers.component.scss']
})
export class ActiveOffersComponent extends OffersOpenForm {

  constructor(
    override offerFormService: OfferFormService
  ) {
    super(offerFormService);
    super.ngOnInit();
  }
}
