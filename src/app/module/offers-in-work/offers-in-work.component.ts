import { Component } from '@angular/core';
import { IsMobilePage } from '../../shared/abstract/mobilePage/mobilePage';
import { OffersOpenForm } from '../../shared/abstract/offers/offersOpenForm';
import { OfferFormService } from '../offers/@shared/services/offersForms.service';

@Component({
  selector: 'app-offers-in-work',
  templateUrl: './offers-in-work.component.html',
  styleUrls: ['./offers-in-work.component.scss']
})
export class OffersInWorkComponent extends OffersOpenForm {

  constructor(
    override offerFormService: OfferFormService
  ) {
    super(offerFormService);
    super.ngOnInit();
  }

}
