import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportIconService } from './@shared/services/supportIcon.service';
import { QuestionsComponent } from './@shared/components/questions/questions.component';
import { FormQuestionComponent } from './@shared/components/form-question/form-question.component';

const routes: Routes = [
  {path: '', component: SupportComponent}
]

@NgModule({
  declarations: [
    SupportComponent,
    QuestionsComponent,
    FormQuestionComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SupportIconService]
})
export class SupportModule { }
