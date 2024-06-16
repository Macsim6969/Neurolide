import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportIconService } from '../../services/supportIcon.service';
import { Subject, takeUntil } from 'rxjs';
import { QuestionsData } from '../../interface/questions.interface';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public questionsData: QuestionsData[];

  constructor(
    private translate: TranslateService,
    private supportIcon: SupportIconService
  ) { }

  ngOnInit(): void {
    this.streamDataSupportQuestions();
  }

  private streamDataSupportQuestions() {
    this.translate.stream('support.questions').pipe(takeUntil(this.destroy$))
      .subscribe((data: QuestionsData[]) => {
        this.questionsData = data;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
