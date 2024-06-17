import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { ShareModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { AddedCardComponent } from './@shared/components/added-card/added-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditCardFormatterPipe } from './@shared/pipe/creditCardFormatter.pipe';
import { DateInputFormatPipe } from './@shared/pipe/dateInputFormat.pipe';
import { HistoryPaymentComponent } from './@shared/components/history-payment/history-payment.component';
import { PhoneFormatPipe } from './@shared/pipe/phoneFormat.pipe';
import { BalanceServiceModule } from '../../shared/services/balance/balanceService.module';

const routes: Routes = [
  { path: '', component: BalanceComponent }
]

@NgModule({
  declarations: [
    BalanceComponent,
    HistoryPaymentComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    BalanceServiceModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AddedCardComponent
  ]
})
export class BalanceModule { }
