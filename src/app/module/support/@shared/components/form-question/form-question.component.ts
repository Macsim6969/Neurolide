import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { QuestionForm } from '../../interface/questions.interface';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public form: FormGroup;
  public formData: QuestionForm;
  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.streamDataFromJson();
  }

  private initializeFormGroup() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      text: new FormControl('', [Validators.required]),
      file: new FormControl('')
    })
  }

  private streamDataFromJson() {
    this.translate.stream('support.form').pipe(takeUntil(this.destroy$)).subscribe((data: QuestionForm) => {
      this.formData = data;
    })
  }

  public onFileSelected(event){

  }

  public submit() { 
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
