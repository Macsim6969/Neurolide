import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaChanelsComponent } from './media-chanels.component';
import { RouterModule, Routes } from '@angular/router';
import { MediaFormService } from './@shared/services/mediaForm.service';
import { MediaChannelService } from './@shared/services/mediaChannel.service';
import { MediaModuleClass } from './@shared/module/media.module';

const routes: Routes = [
  { path: '', component: MediaChanelsComponent }
]

@NgModule({
  declarations: [   
  ],
  imports: [
    MediaModuleClass,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ]
})
export class MediaChanelsModule { }
