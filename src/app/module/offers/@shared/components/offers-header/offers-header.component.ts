import { Component, Input, OnInit } from '@angular/core';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OfferFormService } from '../../services/offersForms.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { OfferHeaderTitle } from '../../../../../shared/abstract/offers/offersHeaderTitle';

@Component({
  selector: 'app-offers-header',
  templateUrl: './offers-header.component.html',
  styleUrls: ['./offers-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class OffersHeaderComponent extends OfferHeaderTitle {
}
