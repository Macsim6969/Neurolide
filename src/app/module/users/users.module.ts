import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';
import { UsersListComponent } from './@share/components/users-list/users-list.component';
import { ListIconsService } from './@share/services/listIcon.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  ChangeMonitoringDataService } from './@share/services/changeMonitoringData.service';
import { CardFormatPipe } from './@share/pipe/cardFormat.pipe';
import { PopupEditeUserComponent } from './@share/components/popup-edite-user/popup-edite-user.component';
import { UserService } from './@share/services/user.service';
import { PopupEditetTransitionComponent } from './@share/components/popup-edite-transition/popup-edite-transition.component';
import { UserHeaderComponent } from './@share/components/user-header/user-header.component';

const routes: Routes = [
  { path: '', component: UsersComponent }
]

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    CardFormatPipe,
    PopupEditeUserComponent,
    PopupEditetTransitionComponent,
    UserHeaderComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CardFormatPipe
  ],
  providers : [ListIconsService, ChangeMonitoringDataService, UserService]
})
export class UsersModule { }
