import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportIconService } from '../../services/supportIcon.service';
import { QuestionsClass } from '../../abstract/questionBlock';

@Component({
  selector: 'app-questions-mobile',
  templateUrl: './questions-mobile.component.html',
  styleUrls: ['./questions-mobile.component.scss']
})
export class QuestionsMobileComponent extends QuestionsClass {

  constructor(
    override translate: TranslateService,
    override supportIcon: SupportIconService
  ){
     super(translate, supportIcon)
  }

}
