import { OnInit, OnDestroy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { DateInputFormatPipe } from './pipe/dateInputFormat.pipe';
@Component({
  template: ''
})
export abstract class BasePopupComponent implements OnInit, OnDestroy {

  protected destroy$ = new Subject<void>();
  public form: FormGroup;
  protected dateInputFormatPipe = new DateInputFormatPipe();

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.initializeForm();
  }

  protected abstract initializeForm(): void;

  public onInputChange(event: any, maxLength: number): void {
    const input = event.target;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
      this.form.get(input.getAttribute('formControlName')).setValue(input.value);
    }
  }

  public onDateInputChange(event: any): void {
    const input = event.target;
    let value = input.value;
    value = this.dateInputFormatPipe.transform(value);
    this.form.get('data').setValue(value);
  }

  public abstract submit(): void;

  public closePopup() {
    this.form.reset();
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.body.style.overflow = '';
  }
}
