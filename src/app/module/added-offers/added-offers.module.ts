import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedOffersComponent } from './added-offers.component';
import { RouterModule, Routes } from '@angular/router';
import { AddedOfferModule } from './@shared/module/addedOffer.module';
import { ShareModule } from '../../shared/shared.module';
import { DragScrollModule } from 'ngx-drag-scroll';

const routes: Routes = [
  { path: '', component: AddedOffersComponent }
]

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    AddedOfferModule,
    RouterModule.forChild(routes)
  ]
})
export class AddedOffersModule { }
