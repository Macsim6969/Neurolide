import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { ShareModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BalanceComponent }
]

@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class BalanceModule { }
