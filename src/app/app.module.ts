import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environment/environment';
import { storeReducers } from './store/reducers/store.reducers';
import { AuthEffects } from './store/effects/store.effects';
import { BackendService } from './shared/services/backend.service';
import { AuthService } from './module/auth/@shared/services/auth.service';
import { MonitoringService } from './shared/services/monitoring.service';
import { RulesGuard } from './shared/services/rules.guard';
import { AuthGuard } from './shared/services/uath.guard';
import { SidebarService } from './shared/services/sidebarService';
import { UserSearchService } from './shared/services/userSearch.service';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

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
    RouterModule,
    StoreModule.forRoot({ store: storeReducers }),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
  providers: [
    BackendService, 
    AuthGuard, 
    UserSearchService, 
    RulesGuard, 
    AuthService, 
    MonitoringService, 
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    const storage = getStorage(app);
    const database = getDatabase(app);
  }
 }
