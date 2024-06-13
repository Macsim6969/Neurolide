import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ShareModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HeaderSidebarComponent } from '../../component/header-sidebar/header-sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'users', loadChildren: () => import('../../module/users/users.module').then((m) => m.UsersModule) },
      { path: 'affiliate', loadChildren: () => import('../../module/manager/manager.module').then((m) => m.ManagerModule) },
      { path: 'brand', loadChildren: () => import('../../module/manager/manager.module').then((m) => m.ManagerModule) },
      { path: 'manager', loadChildren: () => import('../../module/manager/manager.module').then((m) => m.ManagerModule) },
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
  ]
})
export class HomeModule { }
