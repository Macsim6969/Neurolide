import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ShareModule } from '../../shared/shared.module';
import { UserEditComponent } from './@shared/component/user-edit/user-edit.component';
import { PopupEditeComponent } from './@shared/component/popup-edite/popup-edite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileServices } from './@shared/services/profile.service';
import { BalanceServiceModule } from '../../shared/services/balance/balanceService.module';
import { GraphicsDataComponent } from './@shared/component/graphics-data/graphics-data.component';



@NgModule({
  declarations: [
    ProfileComponent,
    UserEditComponent,
    PopupEditeComponent,
    GraphicsDataComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProfileComponent,
    UserEditComponent
  ],
  providers: [ProfileServices]
})
export class ProfileModule { }
