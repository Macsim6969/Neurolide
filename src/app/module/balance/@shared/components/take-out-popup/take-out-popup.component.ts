import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardsPayment } from '../../../../../shared/interfaces/backend.interface';
import { Subject } from 'rxjs';
import { BalanceCardService } from '../../services/balanceCard.service';
import { DateInputFormatPipe } from '../../pipe/dateInputFormat.pipe';

@Component({
  selector: 'app-take-out-popup',
  templateUrl: './take-out-popup.component.html',
  styleUrls: ['./take-out-popup.component.scss']
})
export class TakeOutPopupComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public cardInfo: CardsPayment;
  public form: FormGroup;
  dateInputFormatPipe = new DateInputFormatPipe();
  constructor(
    private balanceCardService: BalanceCardService
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup<any>({
      numberCard: new FormControl('', [Validators.required, Validators.maxLength(19)]),
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      cvc: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      data: new FormControl('', [
        Validators.required,
        Validators.pattern('(0[1-9]|1[0-2])/([0-9]{2})') // Pattern for MM/YY
      ])
    })
  }

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

  public submit() {
    this.balanceCardService.setNewCard(this.form.value)
    this.closePopup();
  }

  public closePopup() {
    this.form.reset();
    this.balanceCardService._isAddCard = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.body.style.overflow = ''
  }
}
