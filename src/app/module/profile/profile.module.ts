import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ShareModule } from '../../shared/shared.module';
import { UserEditComponent } from './@shared/component/user-edit/user-edit.component';
import { UserActionComponent } from './@shared/component/user-action/user-action.component';



@NgModule({
  declarations: [
    ProfileComponent,
    UserEditComponent,
    UserActionComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [
    ProfileComponent,
    UserEditComponent,
    UserActionComponent
  ]
})
export class ProfileModule { }
