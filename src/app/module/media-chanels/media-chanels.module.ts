import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaChanelsComponent } from './media-chanels.component';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaHeaderComponent } from './@shared/components/media-header/media-header.component';
import { MediaListComponent } from './@shared/components/media-list/media-list.component';
import { MediaFormService } from './@shared/services/mediaForm.service';

const routes: Routes = [
  { path: '', component: MediaChanelsComponent }
]

@NgModule({
  declarations: [
    MediaChanelsComponent,
    MediaHeaderComponent,
    MediaListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  providers: [MediaFormService]
})
export class MediaChanelsModule { }
