import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit, OnDestroy{


  public form: FormGroup;
  constructor(){}

  ngOnInit(): void {
    
  }

  private initializeFormGroup(){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      text: new FormControl('', [Validators.required]),
      file: new FormControl('')
    })
  }

  public submit(){}

  ngOnDestroy(): void {
    
  }
}
