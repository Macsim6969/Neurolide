import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedOffersComponent } from './added-offers.component';
import { ShareModule } from '../../shared/shared.module';
import { OffersBlockModule } from '../offers/@shared/module/offersBlock.module';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: AddedOffersComponent }
]

@NgModule({
  declarations: [
    AddedOffersComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    OffersBlockModule,
    RouterModule.forChild(routes)
  ]
})
export class AddedOffersModule { }
