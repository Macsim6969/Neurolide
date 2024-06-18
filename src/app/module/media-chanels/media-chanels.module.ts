import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaChanelsComponent } from './media-chanels.component';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaHeaderComponent } from './@shared/components/media-header/media-header.component';

const routes: Routes = [
  { path: '', component: MediaChanelsComponent }
]

@NgModule({
  declarations: [
    MediaChanelsComponent,
    MediaHeaderComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class MediaChanelsModule { }
