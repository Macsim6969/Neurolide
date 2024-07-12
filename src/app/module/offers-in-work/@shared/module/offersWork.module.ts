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
import { DragScrollModule } from "ngx-drag-scroll";
import { TruncateUserIdPipe } from "../pipe/truncateUserId.pipe";

@NgModule({
  declarations: [
    OffersInWorkComponent,
    WorksOffersFilterComponent,
    WorksOffersHeaderComponent,
    WorksOffersListComponent,
    WorksOffersMobileComponent,
    TruncateUserIdPipe
  ],
  imports: [
    CommonModule,
    ShareModule,
    DragScrollModule,
    OffersBlockModule,
    TranslateModule
  ],
  exports: [
    OffersInWorkComponent,
    TruncateUserIdPipe
  ]
})

export class OfferWorkModule { }