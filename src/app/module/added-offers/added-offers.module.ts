import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedOffersComponent } from './added-offers.component';
import { ShareModule } from '../../shared/shared.module';
import { OffersBlockModule } from '../offers/@shared/module/offersBlock.module';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddedOffersHeaderComponent } from './@shared/components/offers-header/added-offers-header.component';
import { AddedOffersFilterComponent } from './@shared/components/offers-filter/added-offers-filter.component';
import { AddedOffersListComponent } from './@shared/components/offers-list/added-offers-list.component';

const routes: Routes = [
  { path: '', component: AddedOffersComponent }
]

@NgModule({
  declarations: [
    AddedOffersComponent,
    AddedOffersHeaderComponent,
    AddedOffersFilterComponent,
    AddedOffersListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    OffersBlockModule,
    RouterModule.forChild(routes)
  ]
})
export class AddedOffersModule { }
