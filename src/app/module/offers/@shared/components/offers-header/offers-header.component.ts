import { Component, Input, OnInit } from '@angular/core';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { OfferFormService } from '../../services/offersForms.service';
import { SearchMediaChannelAndOffersService } from '../../../../../shared/services/searchMediaChannelAndOffers.service';

@Component({
  selector: 'app-offers-header',
  templateUrl: './offers-header.component.html',
  styleUrls: ['./offers-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class OffersHeaderComponent implements OnInit{
  @Input() header: string;
  public rules: string;
  constructor(
    private globalIcon: GlobalIconsService,
    private offerFormService: OfferFormService,
    private searchMediaChannelAndOffers: SearchMediaChannelAndOffersService
  ){}

  ngOnInit(): void {
    this.checkRulesUser();
  }

  private checkRulesUser(){
    this.rules = JSON.parse(localStorage.getItem('rules'))
  }

  public openForm() {
    this.offerFormService._isOfferForm = true;
  }

  public changeData(event: any) {
    this.searchMediaChannelAndOffers._searchText = event.target.value;
  }
}
