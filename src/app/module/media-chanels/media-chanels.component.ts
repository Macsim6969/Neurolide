import { Component, OnInit } from '@angular/core';
import { MediaFormService } from './@shared/services/mediaForm.service';
import { MediaChannelsForm } from '../../shared/abstract/mediaChannels/mediaChannelsForm';
import { NavigationIconsService } from '../../shared/services/navigation/navigationIcon.service';
import { GlobalIconsService } from '../../shared/services/globalIcon.service';

@Component({
  selector: 'app-media-chanels',
  templateUrl: './media-chanels.component.html',
  styleUrls: ['./media-chanels.component.scss']
})
export class MediaChanelsComponent extends MediaChannelsForm implements OnInit {
  public rules: string;
  constructor(
    override mediaFormService: MediaFormService,
    private navigationIconsService: NavigationIconsService,
    private globalIcon: GlobalIconsService
  ) {
    super(mediaFormService);
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.checkRulesUser();
  }

  private checkRulesUser() {
    this.rules = JSON.parse(localStorage.getItem('rules'))
  }

  public openForm() {
    this.mediaFormService._isMediaForm = true;
  }

}
