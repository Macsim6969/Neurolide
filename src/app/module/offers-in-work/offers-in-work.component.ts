import { Component, OnInit } from '@angular/core';
import { OffersOpenForm } from '../../shared/abstract/offers/offersOpenForm';
import { OfferFormService } from '../offers/@shared/services/offersForms.service';
import { NavigationIconsService } from '../../shared/services/navigation/navigationIcon.service';

@Component({
  selector: 'app-offers-in-work',
  templateUrl: './offers-in-work.component.html',
  styleUrls: ['./offers-in-work.component.scss']
})
export class OffersInWorkComponent extends OffersOpenForm implements OnInit{
  public url: string;
  constructor(
    override offerFormService: OfferFormService,
    private navigationIconsService: NavigationIconsService
  ) {
    super(offerFormService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkUrlPage();
  }

  private checkUrlPage(){
    this.url = localStorage.getItem('currentRoute');
  }

}
