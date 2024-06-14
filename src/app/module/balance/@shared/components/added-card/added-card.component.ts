import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CardsPayment } from '../../../../../shared/interfaces/backend.interface';
import { BalanceCardService } from '../../services/balanceCard.service';

@Component({
  selector: 'app-added-card',
  templateUrl: './added-card.component.html',
  styleUrls: ['./added-card.component.scss']
})
export class AddedCardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public cardInfo: CardsPayment;
  public form: FormGroup;
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
  onCardNumberInputChange(event: any): void {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (value.length > 16) {
      value = value.slice(0, 16); // Limit to 16 digits
    }

    this.form.get('numberCard').setValue(value);
  }

  onInputChange(event: any, maxLength: number): void {
    const input = event.target;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
      this.form.get(input.getAttribute('formControlName')).setValue(input.value);
    }
  }

  onDateInputChange(event: any): void {
    const input = event.target;
    let value = input.value.replace(/[^0-9/]/g, ''); // Allow only numbers and /
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    // Add / automatically
    if (value.length === 2 && !value.includes('/')) {
      value += '/';
    }
    input.value = value;
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
