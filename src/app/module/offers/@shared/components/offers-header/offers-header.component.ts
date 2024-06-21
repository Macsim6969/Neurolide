import { Component, Input } from '@angular/core';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OfferFormService } from '../../services/offersForms.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';

@Component({
  selector: 'app-offers-header',
  templateUrl: './offers-header.component.html',
  styleUrls: ['./offers-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class OffersHeaderComponent {
  @Input() header: string
  constructor(
    private globalIcon: GlobalIconsService,
    private offerFormService: OfferFormService,
    private searchMediaChannelAndOffers: SearchMediaChannelAndOffersService
  ){}

  public openForm() {
    this.offerFormService._isOfferForm = true;
  }

  public changeData(event: any) {
    this.searchMediaChannelAndOffers._searchText = event.target.value;
  }
}
