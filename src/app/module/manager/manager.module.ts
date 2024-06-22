import { NgModule } from '@angular/core';
import { ManagerComponent } from './manager.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileModule } from '../profile/profile.module';
import { HttpClientModule } from '@angular/common/http';
import { AddedOfferModule } from '../added-offers/@shared/module/addedOffer.module';


const routes: Routes = [
  { path: '', component: ManagerComponent }
]
@NgModule({
  declarations: [
    ManagerComponent,
  ],
  imports: [
    ShareModule,
    ProfileModule,
    AddedOfferModule,
    HttpClientModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class ManagerModule { }

