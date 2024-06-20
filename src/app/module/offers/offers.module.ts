import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './offers.component';
import { OffersHeaderComponent } from './@shared/components/offers-header/offers-header.component';
import { OffersFilterComponent } from './@shared/components/offers-filter/offers-filter.component';
import { OfferFormService } from './@shared/services/offersForms.service';
import { OffersListComponent } from './@shared/components/offers-list/offers-list.component';

const routes: Routes = [
  {path: '', component: OffersComponent}
]

@NgModule({
  declarations: [
    OffersComponent,
    OffersHeaderComponent,
    OffersFilterComponent,
    OffersListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  providers: [OfferFormService]
})
export class OffersModule { }
