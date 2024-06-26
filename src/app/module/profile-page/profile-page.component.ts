import { Component, OnInit } from '@angular/core';
import { MediaChannelsForm } from '../../shared/abstract/mediaChannels/mediaChannelsForm';
import { MediaFormService } from '../media-chanels/@shared/services/mediaForm.service';
import { GlobalIconsService } from '../../shared/services/globalIcon.service';
import { CardsconService } from '../../shared/services/balance/cardsIcon.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent extends MediaChannelsForm implements OnInit {

  public rules: string;
  constructor(
    override mediaFormService: MediaFormService,
    private globalIcon: GlobalIconsService,
    private cardsIconService: CardsconService
  ){
    super(mediaFormService);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.checkRulesUser();
  }

  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'))
  }

}
