import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/uath.guard';
import { RulesGuard } from './shared/services/rules.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {path: '**', redirectTo: '/'},
  {path: '', component: ErrorPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
