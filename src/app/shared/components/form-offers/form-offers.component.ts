import { OfferInterface } from './../../../module/offers/@shared/interface/offer.interface';
import { Component } from '@angular/core';
import { BasePopupComponent } from '../../../module/balance/@shared/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfferFormService } from '../../../module/offers/@shared/services/offersForms.service';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, take, takeUntil } from 'rxjs';
import { ModelPaymentInterface } from '../../../module/offers/@shared/interface/model.interface';
import { OffersService } from '../../../module/offers/@shared/services/offers.service';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../store/model/store.model';
import { selectOffersData } from '../../../store/selectors/store.selectors';

@Component({
  selector: 'app-form-offers',
  templateUrl: './form-offers.component.html',
  styleUrls: ['./form-offers.component.scss']
})
export class FormOffersComponent extends BasePopupComponent {
  public statusEdite: string;
  private offersData: OfferInterface[];
  public offerData: OfferInterface;
  public modelPayment: ModelPaymentInterface[];
  public activeMethod: string;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private offerFormService: OfferFormService,
    private offersService: OffersService,
    private translate: TranslateService
  ) {
    super();
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.streamOffersData();
    this.streamModelPaymentFromJson();
  }

  private streamOffersData() {
    combineLatest(([this.offerFormService._offerData$, this.offerFormService._statusMOde$])).pipe(takeUntil(this.destroy$))
      .subscribe(([dataValue, dataMode]) => {
        this.offerData = dataValue;
        this.activeMethod = dataValue.payout;
        if (dataValue && dataMode === 'edite') {
          this.initializeForm(dataValue);
          this.statusEdite = dataMode;
        } else if (dataMode !== 'edite') {
          this.initializeForm();
        }
      })
  }

  protected override initializeForm(data?: OfferInterface): void {
    this.form = new FormGroup<any>({
      name: new FormControl(data?.name ? data?.name : null, [Validators.required]),
      link: new FormControl(data?.link ? data?.link : null, [Validators.required]),
      brand: new FormControl(data?.brand ? data?.brand : null, [Validators.required]),
      payments: new FormControl(data?.payments ? data?.payments : null, [Validators.required]),
      balance: new FormControl(data?.balance ? data?.balance : null, [Validators.required])
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
    if (this.statusEdite !== 'edite') {
      this.offerFormService.sendMediaChannelsData(this.form.value, this.activeMethod);
    } else {
      this.getAllOffersData();
    }
    this.closePopup()
  }

  private getAllOffersData() {
    this.store.pipe(take(1), select(selectOffersData), takeUntil(this.destroy$)).subscribe((data) => {
      this.offersData = data;
      const newOffers: OfferInterface = {
        ...this.offerData,
        name: this.form.value.name,
        link: this.form.value.link,
        brand: this.form.value.brand,
        payments: this.form.value.payments,
        balance: this.form.value.balance
      }
      this.offersService.setNewChangesFromForm(newOffers, this.offersData);
    })
  }

  public override closePopup(): void {
    this.offerFormService._isOfferForm = false;
    document.body.style.overflow = '';
  }
}
