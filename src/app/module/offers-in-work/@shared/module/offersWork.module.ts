import { NgModule } from "@angular/core";
import { OffersInWorkComponent } from "../../offers-in-work.component";
import { WorksOffersFilterComponent } from "../components/offers-filter/works-offers-filter.component";
import { WorksOffersHeaderComponent } from "../components/offers-header/works-offers-header.component";
import { WorksOffersListComponent } from "../components/offers-list/works-offers-list.component";
import { ShareModule } from "../../../../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { OffersBlockModule } from "../../../offers/@shared/module/offersBlock.module";
import { WorksOffersMobileComponent } from "../components/offers-mobile/works-offers-mobile.component";

@NgModule({
  declarations: [
    OffersInWorkComponent,
    WorksOffersFilterComponent,
    WorksOffersHeaderComponent,
    WorksOffersListComponent,
    WorksOffersMobileComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    OffersBlockModule,
    TranslateModule
  ],
  exports: [
    OffersInWorkComponent
  ]
})

export class OfferWorkModule { }