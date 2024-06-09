import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';
import { UsersListComponent } from './@share/components/users-list/users-list.component';
import { ListIconsService } from './@share/services/listIcon.service';

const routes: Routes = [
  { path: '', component: UsersComponent }
]

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers : [ListIconsService]
})
export class UsersModule { }
