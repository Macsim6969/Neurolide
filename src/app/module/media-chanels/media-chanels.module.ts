import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaChanelsComponent } from './media-chanels.component';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaHeaderComponent } from './@shared/components/media-header/media-header.component';
import { MediaListComponent } from './@shared/components/media-list/media-list.component';
import { MediaFormService } from './@shared/services/mediaForm.service';
import { ListHeaderComponent } from './@shared/components/list-header/list-header.component';
import { ListChannelsComponent } from './@shared/components/list-channels/list-channels.component';
import { MediaChannelService } from './@shared/services/mediaChannel.service';
import { ListMobileComponent } from './@shared/components/list-mobile/list-mobile.component';

const routes: Routes = [
  { path: '', component: MediaChanelsComponent }
]

@NgModule({
  declarations: [
    MediaChanelsComponent,
    MediaHeaderComponent,
    MediaListComponent,
    ListHeaderComponent,
    ListChannelsComponent,
    ListMobileComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  providers: [MediaFormService, MediaChannelService]
})
export class MediaChanelsModule { }
