import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveOffersComponent } from './active-offers.component';
import { ActiveOffersFilterComponent } from './@shared/components/active-offers-filter/active-offers-filter.component';
import { ActiveOffersHeaderComponent } from './@shared/components/active-offers-header/active-offers-header.component';
import { ActiveOffersListComponent } from './@shared/components/active-offers-list/active-offers-list.component';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { OffersBlockModule } from '../offers/@shared/module/offersBlock.module';
import { ActiveOffersMobileComponent } from './@shared/components/active-offers-mobile/active-offers-mobile.component';
import { DragScrollModule } from 'ngx-drag-scroll';

@NgModule({
  declarations: [
    ActiveOffersComponent,
    ActiveOffersFilterComponent,
    ActiveOffersHeaderComponent,
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
    ActiveOffersComponent
  ]
})
export class ActiveOffersModule { }
