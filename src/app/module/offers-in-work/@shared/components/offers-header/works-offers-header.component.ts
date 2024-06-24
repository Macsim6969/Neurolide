import { Component } from '@angular/core';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { OfferFormService } from '../../../../offers/@shared/services/offersForms.service';
import { OfferHeaderTitle } from '../../../../../shared/abstract/offers/offersHeaderTitle';

@Component({
  selector: 'app-works-offers-header',
  templateUrl: './works-offers-header.component.html',
  styleUrls: ['./works-offers-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class WorksOffersHeaderComponent extends OfferHeaderTitle {

  constructor(
    override globalIcon: GlobalIconsService,
    override offerFormService: OfferFormService,
    override searchMediaChannelAndOffers: SearchMediaChannelAndOffersService
  ) {
    super(globalIcon, offerFormService, searchMediaChannelAndOffers);
    super.ngOnInit();
  }
}