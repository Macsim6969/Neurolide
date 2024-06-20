import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './offers.component';

import { OffersBlockModule } from './@shared/module/offersBlock.module';

const routes: Routes = [
  { path: '', component: OffersComponent }
]

@NgModule({
  imports: [
    CommonModule,
    OffersBlockModule,
    RouterModule.forChild(routes)
  ]
})
export class OffersModule { }
