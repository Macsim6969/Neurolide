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

import { TopUpPopupComponent } from './@shared/components/top-up-popup/top-up-popup.component';
import { TakeOutPopupComponent } from './@shared/components/take-out-popup/take-out-popup.component';
import { DateInputFormatPipe } from './@shared/pipe/dateInputFormat.pipe';
import { HistoryPaymentComponent } from './@shared/components/history-payment/history-payment.component';
import { PhoneFormatPipe } from './@shared/pipe/phoneFormat.pipe';
import { BalanceServiceModule } from '../../shared/services/balance/balanceService.module';
import { BalanceCardComponent } from '../../component/balance-card/balance-card.component';

const routes: Routes = [
  { path: '', component: BalanceComponent }
]

@NgModule({
  declarations: [
    BalanceComponent,
    AddedCardComponent,
    CreditCardFormatterPipe,
    DateInputFormatPipe,
    TopUpPopupComponent,
    TakeOutPopupComponent,
    HistoryPaymentComponent,
    PhoneFormatPipe
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    FormsModule,
    BalanceServiceModule,
    ReactiveFormsModule,
    BalanceServiceModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CreditCardFormatterPipe,
    DateInputFormatPipe,
    AddedCardComponent,
    PhoneFormatPipe
  ]
})
export class BalanceModule { }
