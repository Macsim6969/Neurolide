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

const routes: Routes = [
  { path: '', component: UsersComponent }
]

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    CardFormatPipe
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
  providers : [ListIconsService, ChangeMonitoringDataService]
})
export class UsersModule { }
