import { Component } from '@angular/core';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OfferFormService } from '../../services/offersForms.service';

@Component({
  selector: 'app-offers-header',
  templateUrl: './offers-header.component.html',
  styleUrls: ['./offers-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class OffersHeaderComponent {

  constructor(
    private globalIcon: GlobalIconsService,
    private offerFormService: OfferFormService
  ){}

  public openForm() {
    this.offerFormService._isOfferForm = true;
  }

  public changeData(event: any) {
    // this.offerFormService._searchText = event.target.value;
  }
}
