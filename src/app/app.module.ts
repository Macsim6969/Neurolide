import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { storeReducers } from './store/reducers/store.reducers';
import { BackendService } from './shared/services/backend.service';
import { CanActiveGuard } from './shared/services/canActive.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/store.effects';
import { AuthService } from './module/auth/@shared/services/auth.service';
import { MonitoringService } from './shared/services/monitoring.service';
import { RulesGuard } from './shared/services/rules.guard';
import { AuthGuard } from './shared/services/uath.guard';
import { LoadingComponent } from './component/loading/loading.component';
;
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ store: storeReducers }),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [BackendService, AuthGuard, CanActiveGuard, RulesGuard, AuthService, MonitoringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
