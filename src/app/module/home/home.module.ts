import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ShareModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HeaderSidebarComponent } from '../../component/header-sidebar/header-sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IsMobileGuard } from '../../shared/services/isMobileGuard.guard';
import { GlobalIconsService } from '../../shared/services/globalIcon.service';
import { SearchMediaChannelAndOffersService } from '../../shared/services/searchMediaChannelAndOffers.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', loadChildren: () => import('../../module/main-mobile-page/main-mobile-page.module').then((m) => m.MainMobilePageModule), canActivate: [IsMobileGuard] },
      { path: 'manager', loadChildren: () => import('../../module/manager/manager.module').then((m) => m.ManagerModule) },
      { path: 'brand', loadChildren: () => import('../../module/manager/manager.module').then((m) => m.ManagerModule) },
      { path: 'affiliate', loadChildren: () => import('../../module/manager/manager.module').then((m) => m.ManagerModule) },
      { path: 'users', loadChildren: () => import('../../module/users/users.module').then((m) => m.UsersModule) },
      { path: 'media-channels', loadChildren: () => import('../../module/media-chanels/media-chanels.module').then((m) => m.MediaChanelsModule) },
      { path: 'offers', loadChildren: () => import('../../module/offers/offers.module').then((m) => m.OffersModule) },
      { path: 'profile', loadChildren: () => import('../../module/profile-page/profile-page.module').then((m) => m.ProfilePageModule) },
      { path: 'balance', loadChildren: () => import('../../module/balance/balance.module').then((m) => m.BalanceModule) },
      { path: 'support', loadChildren: () => import('../../module/support/support.module').then((m) => m.SupportModule) },
    ]
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    HeaderSidebarComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    MatToolbarModule,
    RouterModule.forChild(routes)
  ],
  providers: [IsMobileGuard, GlobalIconsService, SearchMediaChannelAndOffersService]
})
export class HomeModule { }
