import { NgModule } from "@angular/core";
import { AddedOffersComponent } from "../../added-offers.component";
import { AddedOffersHeaderComponent } from "../components/offers-header/added-offers-header.component";
import { AddedOffersFilterComponent } from "../components/offers-filter/added-offers-filter.component";
import { AddedOffersListComponent } from "../components/offers-list/added-offers-list.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { OffersBlockModule } from "../../../offers/@shared/module/offersBlock.module";
import { ShareModule } from "../../../../shared/shared.module";
import { AddedOffersMobileComponent } from "../components/offers-mobile/added-offers-mobile.component";
import { DragScrollModule } from "ngx-drag-scroll";



@NgModule({
  declarations: [
    AddedOffersComponent,
    AddedOffersHeaderComponent,
    AddedOffersFilterComponent,
    AddedOffersListComponent,
    AddedOffersMobileComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DragScrollModule,
    OffersBlockModule,
    TranslateModule
  ],
  exports: [
    AddedOffersComponent,
    TranslateModule
  ]
})

export class AddedOfferModule { }