import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/canActive.guard';
import { RulesGuard } from './shared/services/rules.guard';

const routes: Routes = [
  { path: 'affiliate', loadChildren: () => import('./module/manager/manager.module').then((m) => m.ManagerModule), canActivate: [RulesGuard] },
  { path: 'brand', loadChildren: () => import('./module/manager/manager.module').then((m) => m.ManagerModule), canActivate: [RulesGuard] },
  { path: 'manager', loadChildren: () => import('./module/manager/manager.module').then((m) => m.ManagerModule), canActivate: [RulesGuard] },
  { path: 'users', loadChildren: () => import('./module/users/users.module').then((m) => m.UsersModule), canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./module/auth/auth.module').then((m) => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
