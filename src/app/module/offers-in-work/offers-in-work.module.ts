import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OffersInWorkComponent } from './offers-in-work.component';
import { OfferWorkModule } from './@shared/module/offersWork.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: OffersInWorkComponent }
]

@NgModule({
  imports: [
    CommonModule,
    OfferWorkModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class OffersInWorkModule { }
