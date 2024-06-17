import { BalanceServiceModule } from './../../shared/services/balance/balanceService.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMobilePageComponent } from './main-mobile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: MainMobilePageComponent}
]

@NgModule({
  declarations: [
    MainMobilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    BalanceServiceModule
  ]
})
export class MainMobilePageModule { }
