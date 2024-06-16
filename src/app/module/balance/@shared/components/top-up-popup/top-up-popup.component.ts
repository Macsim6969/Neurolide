import { Component } from '@angular/core';
import { BalanceActionService } from '../../services/balanceAction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePopupComponent } from '../../form';


@Component({
  selector: 'app-top-up-popup',
  templateUrl: './top-up-popup.component.html',
  styleUrls: ['./top-up-popup.component.scss']
})
export class TopUpPopupComponent extends BasePopupComponent {

  constructor(
    private balanceActionService: BalanceActionService
  ) {
    super();
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
