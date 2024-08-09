import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerActiveOffersComponent } from './manager-active-offers.component';
import { ShareModule } from '../../shared/shared.module';
import { ActiveOffersMobileComponent } from './@shared/components/active-offers-mobile/active-offers-mobile.component';
import { ActiveOffersListComponent } from './@shared/components/active-offers-list/active-offers-list.component';
import { ActiveOffersFilterComponent } from './@shared/components/active-offers-filter/active-offers-filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { DragScrollModule } from 'ngx-drag-scroll';
import { OffersBlockModule } from '../offers/@shared/module/offersBlock.module';



@NgModule({
  declarations: [
    ManagerActiveOffersComponent,
    ActiveOffersFilterComponent,
    ActiveOffersListComponent,
    ActiveOffersMobileComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DragScrollModule,
    TranslateModule,
    OffersBlockModule
  ],
  exports: [
    ManagerActiveOffersComponent
  ]
})
export class ManagerActiveOffersModule { }
