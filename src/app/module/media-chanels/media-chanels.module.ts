import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaChanelsComponent } from './media-chanels.component';
import { RouterModule, Routes } from '@angular/router';
import { MediaModuleClass } from './@shared/module/media.module';

const routes: Routes = [
  { path: '', component: MediaChanelsComponent }
]

@NgModule({
  imports: [
    MediaModuleClass,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MediaChanelsModule { }
