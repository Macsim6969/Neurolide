import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveOffersComponent } from './active-offers.component';
import { ActiveOffersFilterComponent } from './@shared/components/offers-filter/active-offers-filter.component';
import { ActiveOffersHeaderComponent } from './@shared/components/offers-header/active-offers-header.component';
import { ActiveOffersListComponent } from './@shared/components/offers-list/active-offers-list.component';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { OffersBlockModule } from '../offers/@shared/module/offersBlock.module';



@NgModule({
  declarations: [
    ActiveOffersComponent,
    ActiveOffersFilterComponent,
    ActiveOffersHeaderComponent,
    ActiveOffersListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    OffersBlockModule
  ],
  exports: [ActiveOffersFilterComponent,
    ActiveOffersHeaderComponent,
    ActiveOffersListComponent]
})
export class ActiveOffersModule { }
