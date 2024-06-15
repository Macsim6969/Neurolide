import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardsPayment } from '../../../../../shared/interfaces/backend.interface';
import { Subject } from 'rxjs';
import { BalanceCardService } from '../../services/balanceCard.service';
import { DateInputFormatPipe } from '../../pipe/dateInputFormat.pipe';
import { BalanceActionService } from '../../services/balanceAction.service';
import { TakeOutMoney } from '../../interface/form.interface';

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
    private balanceActionService: BalanceActionService
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      numberCard: new FormControl('', [Validators.required, Validators.maxLength(19)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      suma: new FormControl('', [Validators.required])
    })
  }

  public submit() {
    this.balanceActionService.takeOutMoneyFromCard(this.form.value)
    this.closePopup();
  }

  public closePopup() {
    this.form.reset();
    this.balanceActionService._isTakeOutdMoney = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.body.style.overflow = ''
  }
}
