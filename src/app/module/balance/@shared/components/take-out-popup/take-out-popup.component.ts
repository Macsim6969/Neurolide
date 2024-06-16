import { Component } from '@angular/core';
import { BalanceActionService } from '../../services/balanceAction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePopupComponent } from '../../form';


@Component({
  selector: 'app-take-out-popup',
  templateUrl: './take-out-popup.component.html',
  styleUrls: ['./take-out-popup.component.scss']
})
export class TakeOutPopupComponent extends BasePopupComponent {

  constructor(
    private balanceActionService: BalanceActionService
  ) {
    super();
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
}
