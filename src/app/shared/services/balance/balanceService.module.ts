import { NgModule } from "@angular/core";
import { BalanceCardService } from "./balanceCard.service";
import { BalanceActionService } from "./balanceAction.service";
import { CardsconService } from "./cardsIcon.service";


@NgModule({
  declarations: [],
  exports: [],
  providers:[BalanceCardService, BalanceActionService, CardsconService]
})

export class BalanceServiceModule {}