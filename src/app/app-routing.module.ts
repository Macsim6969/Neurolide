import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  CanActiveGuard } from './shared/services/canActive.guard';
import { RulesGuard } from './shared/services/rules.guard';

const routes: Routes = [
  { path: 'affiliate', loadChildren: () => import('./module/manager/manager.module').then((m) => m.ManagerModule), canActivate: [CanActiveGuard] },
  { path: 'brand', loadChildren: () => import('./module/manager/manager.module').then((m) => m.ManagerModule), canActivate: [CanActiveGuard] },
  { path: 'manager', loadChildren: () => import('./module/manager/manager.module').then((m) => m.ManagerModule), canActivate: [CanActiveGuard] },
  { path: 'users', loadChildren: () => import('./module/users/users.module').then((m) => m.UsersModule), canActivate: [CanActiveGuard] },
  { path: '', loadChildren: () => import('./module/auth/auth.module').then((m) => m.AuthModule), canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
