import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportIconService } from '../../services/supportIcon.service';
import { QuestionsClass } from '../../abstract/questionBlock';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';

@Component({
  selector: 'app-questions-mobile',
  templateUrl: './questions-mobile.component.html',
  styleUrls: ['./questions-mobile-dark.component.scss'],
})
export class QuestionsMobileComponent extends QuestionsClass {
  public isOpenTab: boolean[] = [];
  constructor(
    private globalIcon: GlobalIconsService,
    override translate: TranslateService,
    override supportIcon: SupportIconService
  ) {
    super(translate, supportIcon);
  }

  public openTab(index: number) {
    this.isOpenTab = [];
    this.isOpenTab[index] = true;
  }
}
