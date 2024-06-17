import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SidebarComponent } from "../component/sidebar/sidebar.component";
import { HeaderComponent } from "../component/header/header.component";
import { CommonModule } from "@angular/common";
import { MatListModule } from '@angular/material/list';
import { RouterModule } from "@angular/router";
import { LoadingComponent } from "../component/loading/loading.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavigationComponent } from "../component/navigation/navigation.component";
import { CardsPaymentComponent } from "../component/cards-payment/cards-payment.component";
import { FormatCardNumberPipe } from "./pipe/formatCardNumber.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { BalanceCardComponent } from "../component/balance-card/balance-card.component";
import { CardsPaymentMobileComponent } from "../component/cards-payment-mobile/cards-payment-mobile.component";


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LoadingComponent,
    CardsPaymentComponent,
    CardsPaymentMobileComponent,
    BalanceCardComponent,
    NavigationComponent,
    FormatCardNumberPipe
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    SidebarComponent,
    HeaderComponent,
    LoadingComponent,
    NavigationComponent,
    MatProgressSpinnerModule,
    CardsPaymentComponent,
    FormatCardNumberPipe,
    BalanceCardComponent,
    CardsPaymentMobileComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    TranslateModule,
    MatProgressSpinnerModule
  ]
})

export class ShareModule {
}
