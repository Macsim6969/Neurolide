import { Component } from '@angular/core';
import { HeaderSearchClass } from '../../../../../shared/abstract/header_search/header_search';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { MediaFormService } from '../../services/mediaForm.service';
import { SearchMediaChannelService } from '../../services/searchMediaChannel.service';

@Component({
  selector: 'app-media-header',
  templateUrl: './media-header.component.html',
  styleUrls: ['./media-header.component.scss', '../../../../../shared/abstract/header_search/header_search.scss']
})
export class MediaHeaderComponent extends HeaderSearchClass {

  constructor(
    override globalIcon: GlobalIconsService,
    private mediaFormService: MediaFormService,
    private searchMediaChannel : SearchMediaChannelService
  ) {
    super(globalIcon);
  }

  public openForm() {
    this.mediaFormService._isMediaForm = true;
  }

  public changeData(event: any) {
    this.searchMediaChannel._searchText = event.target.value;
  }


}
