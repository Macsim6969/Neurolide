import { NgModule } from "@angular/core";
import { BalanceCardService } from "./balanceCard.service";
import { BalanceActionService } from "./balanceAction.service";
import { CardsconService } from "./cardsIcon.service";
import { TakeOutPopupComponent } from "../../../module/balance/@shared/components/take-out-popup/take-out-popup.component";
import { TopUpPopupComponent } from "../../../module/balance/@shared/components/top-up-popup/top-up-popup.component";
import { AddedCardComponent } from "../../../module/balance/@shared/components/added-card/added-card.component";
import { ShareModule } from "../../shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreditCardFormatterPipe } from "../../../module/balance/@shared/pipe/creditCardFormatter.pipe";
import { DateInputFormatPipe } from "../../../module/balance/@shared/pipe/dateInputFormat.pipe";
import { PhoneFormatPipe } from "../../../module/balance/@shared/pipe/phoneFormat.pipe";


@NgModule({
  declarations: [
    AddedCardComponent,
    TopUpPopupComponent,
    TakeOutPopupComponent,
    CreditCardFormatterPipe,
    DateInputFormatPipe,
    PhoneFormatPipe
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddedCardComponent,
    TopUpPopupComponent,
    TakeOutPopupComponent,
  ],
  providers: [BalanceActionService]
})

export class BalanceServiceModule { }