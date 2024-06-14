import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { ShareModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsconService } from './@shared/services/cardsIcon.service';
import { BalanceCardService } from './@shared/services/balanceCard.service';
import { AddedCardComponent } from './@shared/components/added-card/added-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditCardFormatterPipe } from './@shared/pipe/creditCardFormatter.pipe';
import { BalanceCardComponent } from './@shared/components/balance-card/balance-card.component';

const routes: Routes = [
  { path: '', component: BalanceComponent }
]

@NgModule({
  declarations: [
    BalanceComponent,
    AddedCardComponent,
    CreditCardFormatterPipe,
    BalanceCardComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CreditCardFormatterPipe,
    AddedCardComponent
  ],
  providers: [CardsconService, BalanceCardService]
})
export class BalanceModule { }
