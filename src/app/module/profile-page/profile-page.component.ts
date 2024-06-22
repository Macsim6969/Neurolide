import { Component, OnInit } from '@angular/core';
import { MediaChannelsForm } from '../../shared/abstract/mediaChannels/mediaChannelsForm';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent extends MediaChannelsForm implements OnInit {

  public rules: string;
  override ngOnInit(): void {
    this.checkRulesUser();
  }

  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'))
  }

}
