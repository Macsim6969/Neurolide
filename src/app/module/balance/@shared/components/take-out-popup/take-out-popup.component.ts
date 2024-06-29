import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePopupComponent } from '../../form';
import { BalanceActionService } from '../../../../../shared/services/balance/balanceAction.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { TakeOutInterface } from '../../interface/takeOutUp.interface';


@Component({
  selector: 'app-take-out-popup',
  templateUrl: './take-out-popup.component.html',
  styleUrls: ['./take-out-popup.component.scss']
})
export class TakeOutPopupComponent extends BasePopupComponent implements OnInit {
  public takeOutData: TakeOutInterface;
  constructor(
    private balanceActionService: BalanceActionService,
    private translate: TranslateService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.streamTakeOutDataFromJson()
  }

  private streamTakeOutDataFromJson() {
    this.translate.stream('balance.takeOut').pipe(takeUntil(this.destroy$))
      .subscribe((data: TakeOutInterface) => {
        this.takeOutData = data;
      })
  }

  protected initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      numberCard: new FormControl('', [Validators.required, Validators.maxLength(19)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      suma: new FormControl('', [Validators.required])
    });
  }

  public submit() {
    this.balanceActionService.takeOutMoneyFromCard(this.form.value);
    this.closePopup();
  }

  public override closePopup(): void {
    this.balanceActionService._isTakeOutdMoney = false;
  }
}
