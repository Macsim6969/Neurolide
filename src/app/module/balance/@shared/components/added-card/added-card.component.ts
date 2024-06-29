import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CardsPayment } from '../../../../../shared/interfaces/backend.interface';
import { DateInputFormatPipe } from '../../pipe/dateInputFormat.pipe';
import { BalanceCardService } from '../../../../../shared/services/balance/balanceCard.service';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { TranslateService } from '@ngx-translate/core';
import { AdddedCardData } from '../../interface/addCard.interface';

@Component({
  selector: 'app-added-card',
  templateUrl: './added-card.component.html',
  styleUrls: ['./added-card.component.scss']
})
export class AddedCardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public cardInfo: CardsPayment;
  public form: FormGroup;
  public addedCardData: AdddedCardData;
  public dateInputFormatPipe = new DateInputFormatPipe();
  constructor(
    private balanceCardService: BalanceCardService,
    private globalIcon: GlobalIconsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.streamAddedCardData();
    this.initializeForm();
  }

  private streamAddedCardData() {
    this.translate.stream('balance.addCardForm').pipe(takeUntil(this.destroy$))
      .subscribe((data: AdddedCardData) => {
        this.addedCardData = data;
      })
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
