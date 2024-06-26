import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ShareModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MediaModuleClass } from '../media-chanels/@shared/module/media.module';
import { HistoryPaymentComponent } from '../balance/@shared/components/history-payment/history-payment.component';

const routes: Routes = [
  { path: '', component: ProfilePageComponent }
]

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ProfileModule,
    MediaModuleClass,
    HttpClientModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfilePageModule { }
