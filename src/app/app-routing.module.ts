import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/canActive.guard';

const routes: Routes = [
  { path: 'manager', loadChildren: () => import('./module/manager/manager.module').then((m) => m.ManagerModule) },
  { path: '', loadChildren: () => import('./module/auth/auth.module').then((m) => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
