import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from 'src/app/module/auth/@shared/component/register/register.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: 'auth', component: RegisterComponent },
      { path: '**', redirectTo: 'auth' }
    ]
  }
]

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
