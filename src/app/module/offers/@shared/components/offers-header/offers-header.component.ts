import { Component } from '@angular/core';
import { OfferHeaderTitle } from '../../../../../shared/abstract/offers/offersHeaderTitle';

@Component({
  selector: 'app-offers-header',
  templateUrl: './offers-header.component.html',
  styleUrls: ['./offers-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class OffersHeaderComponent extends OfferHeaderTitle {
}
