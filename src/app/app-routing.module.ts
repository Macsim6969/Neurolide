import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/uath.guard';
import { RulesGuard } from './shared/services/rules.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./module/home/home.module').then((m) => m.HomeModule), canActivate: [RulesGuard] },
  { path: '', loadChildren: () => import('./module/auth/auth.module').then((m) => m.AuthModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
