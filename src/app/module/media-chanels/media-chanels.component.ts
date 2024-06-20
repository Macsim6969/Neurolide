import { Component } from '@angular/core';
import { MediaFormService } from './@shared/services/mediaForm.service';
import { MediaChannelsForm } from '../../shared/abstract/mediaChannels/mediaChannelsForm';

@Component({
  selector: 'app-media-chanels',
  templateUrl: './media-chanels.component.html',
  styleUrls: ['./media-chanels.component.scss']
})
export class MediaChanelsComponent extends MediaChannelsForm {

  constructor(
    override mediaFormService: MediaFormService
  ) {
    super(mediaFormService);
    super.ngOnInit();
  }

}
