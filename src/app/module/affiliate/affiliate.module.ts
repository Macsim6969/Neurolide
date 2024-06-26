import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffiliateComponent } from './affiliate.component';
import { ShareModule } from '../../shared/shared.module';
import { ProfileModule } from '../profile/profile.module';
import { OfferWorkModule } from '../offers-in-work/@shared/module/offersWork.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: AffiliateComponent}
]

@NgModule({
  declarations: [
    AffiliateComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ProfileModule,
    OfferWorkModule,
    HttpClientModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class AffiliateModule { }
