import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePopupComponent } from '../../form';
import { BalanceActionService } from '../../../../../shared/services/balance/balanceAction.service';
import { TranslateService } from '@ngx-translate/core';
import { TakeUpInterface } from '../../interface/takeOutUp.interface';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-top-up-popup',
  templateUrl: './top-up-popup.component.html',
  styleUrls: ['./top-up-popup.component.scss']
})
export class TopUpPopupComponent extends BasePopupComponent implements OnInit{
  public takeUpData: TakeUpInterface;
  constructor(
    private balanceActionService: BalanceActionService,
    private translate: TranslateService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.streamTakeUpDataFromJson()
  }

  private streamTakeUpDataFromJson() {
    this.translate.stream('balance.takeOut').pipe(takeUntil(this.destroy$))
      .subscribe((data: TakeUpInterface) => {
        this.takeUpData = data;
      })
  }

  protected initializeForm(): void {
    this.form = new FormGroup({
      numberCard: new FormControl('', [Validators.required, Validators.maxLength(19)]),
      data: new FormControl('', [
        Validators.required,
        Validators.pattern('(0[1-9]|1[0-2])/([0-9]{2})') // Pattern for MM/YY
      ]),
      cvc: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      suma: new FormControl('', [Validators.required])
    });
  }

  public submit() {
    this.balanceActionService.addMoneyToCard(this.form.value);
    this.closePopup();
  }

  public override closePopup(): void {
    this.balanceActionService._isAddedMoney = false;
  }
}
