import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './@shared/component/register/register.component';
import { ShareModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthIconsService } from './@shared/services/authIcon.service';
import { LoginComponent } from './@shared/component/login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { PopupInfoService } from './@shared/services/popupInfo.service';
import { RegisterManagerComponent } from './@shared/component/register-manager/register-manager.component';
import { LoginManagerComponent } from './@shared/component/login-manager/login-manager.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'mregister', component: RegisterManagerComponent },
      { path: 'mlogin', component: LoginManagerComponent },
      { path: '**', redirectTo: 'register' }
    ]
  }
]

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    RegisterManagerComponent,
    LoginManagerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthIconsService, PopupInfoService]
})
export class AuthModule { }
