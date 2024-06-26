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

  constructor(
    override offerFormService: OfferFormService,
    private navigationIconsService: NavigationIconsService
  ) {
    super(offerFormService);
  }

  override ngOnInit(): void {
    super.ngOnInit()
  }
}
