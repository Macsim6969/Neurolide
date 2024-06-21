import { Component } from '@angular/core';
import { OffersOpenForm } from '../../shared/abstract/offers/offersOpenForm';
import { OfferFormService } from '../offers/@shared/services/offersForms.service';

@Component({
  selector: 'app-added-offers',
  templateUrl: './added-offers.component.html',
  styleUrls: ['./added-offers.component.scss']
})
export class AddedOffersComponent extends OffersOpenForm {

  constructor(
    override offerFormService: OfferFormService
  ) {
    super(offerFormService);
    super.ngOnInit();
  }
}
