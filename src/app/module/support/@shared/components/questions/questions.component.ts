import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportIconService } from '../../services/supportIcon.service';
import { QuestionsClass } from '../../abstract/questionBlock';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions-dark.component.scss'],
})
export class QuestionsComponent extends QuestionsClass {
  constructor(
    override translate: TranslateService,
    override supportIcon: SupportIconService
  ) {
    super(translate, supportIcon);
  }
}
