import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ShareModule } from '../../shared/shared.module';
import { UserEditComponent } from './@shared/component/user-edit/user-edit.component';
import { UserActionComponent } from './@shared/component/user-action/user-action.component';
import { PopupEditeComponent } from './@shared/component/popup-edite/popup-edite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileServices } from './@shared/services/profile.service';



@NgModule({
  declarations: [
    ProfileComponent,
    UserEditComponent,
    UserActionComponent,
    PopupEditeComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProfileComponent,
    UserEditComponent,
    UserActionComponent
  ],
  providers: [ProfileServices]
})
export class ProfileModule { }
