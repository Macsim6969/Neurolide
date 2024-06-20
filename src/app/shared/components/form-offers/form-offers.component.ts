import { Component } from '@angular/core';
import { BasePopupComponent } from '../../../module/balance/@shared/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfferFormService } from '../../../module/offers/@shared/services/offersForms.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ModelPaymentInterface } from '../../../module/offers/@shared/interface/model.interface';

@Component({
  selector: 'app-form-offers',
  templateUrl: './form-offers.component.html',
  styleUrls: ['./form-offers.component.scss']
})
export class FormOffersComponent extends BasePopupComponent {

  public modelPayment: ModelPaymentInterface[];
  public activeMethod: string;
  constructor(
    private offerFormService: OfferFormService,
    private translate: TranslateService
  ) {
    super();
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.initializeForm();
    this.streamModelPaymentFromJson();
  }

  protected override initializeForm(): void {
    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      payout: new FormControl(null, [Validators.required]),
      balance: new FormControl(null, [Validators.required])
    })
  }

  private streamModelPaymentFromJson() {
    this.translate.stream('offers.offerModel').pipe(takeUntil(this.destroy$)).subscribe((data: ModelPaymentInterface[]) => {
      this.modelPayment = data;
    })
  }

  public choiceMethod(value: string) {
    this.activeMethod = value;
  }

  public override submit(): void {
    this.offerFormService.sendMediaChannelsData(this.form.value, this.activeMethod);
    this.closePopup()
  }

  public override closePopup(): void {
    this.offerFormService._isOfferForm = false;
    document.body.style.overflow = '';
  }
}
