import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';


const routes: Routes = [
  { path: '', component: ManagerComponent }
]
@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class ManagerModule { }

