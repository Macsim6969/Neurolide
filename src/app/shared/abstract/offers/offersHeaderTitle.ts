import { Component, Input, OnInit } from "@angular/core";
import { GlobalIconsService } from "../../services/globalIcon.service";
import { OfferFormService } from "../../../module/offers/@shared/services/offersForms.service";
import { SearchMediaChannelAndOffersService } from "../../services/searchMediaChannelAndOffers.service";

@Component({
  template: ''
})

export abstract class OfferHeaderTitle implements OnInit {
  @Input() header: string;
  public rules: string;
  constructor(
    protected globalIcon: GlobalIconsService,
    protected offerFormService: OfferFormService,
    protected searchMediaChannelAndOffers: SearchMediaChannelAndOffersService
  ) { }

  ngOnInit(): void {
    this.checkRulesUser();
  }

  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'))
  }

  public openForm(rules: 'added' | 'offers' | 'active') {
    this.offerFormService._isOfferForm = true;
    this.offerFormService._rulesOffer = rules;
  }

  public changeData(event: any) {
    this.searchMediaChannelAndOffers._searchText = event.target.value;
  }
}