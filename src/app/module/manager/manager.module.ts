import { NgModule } from '@angular/core';
import { ManagerComponent } from './manager.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileModule } from '../profile/profile.module';
import { HttpClientModule } from '@angular/common/http';
import { OffersBlockModule } from '../offers/@shared/module/offersBlock.module';


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
    OffersBlockModule,
    HttpClientModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class ManagerModule { }

