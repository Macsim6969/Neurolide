import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedOffersComponent } from './added-offers.component';
import { OffersBlockModule } from '../offers/@shared/module/offersBlock.module';
import { RouterModule, Routes } from '@angular/router';
import { AddedOfferModule } from './@shared/module/addedOffer.module';
import { ShareModule } from '../../shared/shared.module';

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
