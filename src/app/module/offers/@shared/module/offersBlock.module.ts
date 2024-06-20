import { NgModule } from "@angular/core";
import { OffersMobileComponent } from "../components/offers-mobile/offers-mobile.component";
import { OffersListComponent } from "../components/offers-list/offers-list.component";
import { OffersFilterComponent } from "../components/offers-filter/offers-filter.component";
import { OffersHeaderComponent } from "../components/offers-header/offers-header.component";
import { OffersComponent } from "../../offers.component";
import { CommonModule } from "@angular/common";
import { ShareModule } from "../../../../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { OfferFormService } from "../services/offersForms.service";
import { OffersService } from "../services/offers.service";


@NgModule({
  declarations: [
    OffersComponent,
    OffersHeaderComponent,
    OffersFilterComponent,
    OffersListComponent,
    OffersMobileComponent
  ],
  exports: [
    OffersHeaderComponent,
    OffersFilterComponent,
    OffersListComponent,
    OffersMobileComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
  ],
  providers: [OfferFormService, OffersService]
})

export class OffersBlockModule {}