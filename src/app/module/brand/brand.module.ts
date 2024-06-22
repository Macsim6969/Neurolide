import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand.component';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { HttpClientModule } from '@angular/common/http';
import { ActiveOffersModule } from '../active-offers/active-offers.module';

const routes: Routes = [
  {path: '', component: BrandComponent}
]

@NgModule({
  declarations: [
    BrandComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ProfileModule,
    ActiveOffersModule,
    HttpClientModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class BrandModule { }
