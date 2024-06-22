import { Component } from '@angular/core';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';
import { OfferFormService } from '../../../../offers/@shared/services/offersForms.service';
import { OfferHeaderTitle } from '../../../../../shared/abstract/offers/offersHeaderTitle';

@Component({
  selector: 'app-active-offers-header',
  templateUrl: './active-offers-header.component.html',
  styleUrls: ['./active-offers-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class ActiveOffersHeaderComponent extends OfferHeaderTitle {

  constructor(
    override globalIcon: GlobalIconsService,
    override offerFormService: OfferFormService,
    override searchMediaChannelAndOffers: SearchMediaChannelAndOffersService
  ) {
    super(globalIcon, offerFormService, searchMediaChannelAndOffers);
    super.ngOnInit();
  }


}
