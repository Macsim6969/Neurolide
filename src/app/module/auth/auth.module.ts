import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './@shared/component/register/register.component';
import { ShareModule } from '../../shared/shared.module';

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
    AuthComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
