import { Component } from '@angular/core';
import { BasePopupComponent } from '../../../module/balance/@shared/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MediaFormService } from '../../../module/media-chanels/@shared/services/mediaForm.service';
import { combineLatest, take, takeUntil } from 'rxjs';
import { MediaFormInterface } from '../../../module/media-chanels/@shared/interface/mediaForm.interface';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../store/model/store.model';
import { selectMediaChannels } from '../../../store/selectors/store.selectors';
import { MediaChannelService } from '../../../module/media-chanels/@shared/services/mediaChannel.service';

@Component({
  selector: 'app-form-media',
  templateUrl: './form-media.component.html',
  styleUrls: ['./form-media.component.scss']
})
export class FormMediaComponent extends BasePopupComponent {

  public paymentData = [
    {
      title: 'CPH',
      value: 'UTC',
      price: '$'
    },
    {
      title: 'CPM',
      value: 'CTR',
      price: '$'
    }
  ]
  public choicePayment: string;
  public isOpen: boolean = false;
  public isOpenTab: boolean[] = [];
  private mediaChannelsData: MediaFormInterface[];
  private mediaData: MediaFormInterface;

  private statusEdite: string
  constructor(
    private store: Store<{store: StoreInterface}>,
    private mediaFormService: MediaFormService,
    private mediaChannelsService: MediaChannelService
  ) {
    super();
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.streamOffersData()
  }
  private streamOffersData() {
    combineLatest(([this.mediaFormService._mediaData$, this.mediaFormService._statusMOde$]))
      .pipe(takeUntil(this.destroy$)).subscribe(([dataValue, dataMode]) => {
        this.mediaData = dataValue;
        this.choicePayment = dataValue.payout;
        if (dataValue && dataMode === 'edite') {
          this.initializeForm(dataValue);
          this.statusEdite = dataMode;
        } else if (dataMode !== 'edite') {
          this.initializeForm();
        }
      })
  }

  protected override initializeForm(data?: MediaFormInterface): void {
    this.form = new FormGroup<any>({
      name: new FormControl(data?.name ? data.name : null, [Validators.required]),
      link: new FormControl(data?.link ? data.link : null, [Validators.required]),
      subscribe: new FormControl(data?.subscribe ? data.subscribe : null, [Validators.required, Validators.maxLength(19)]),
      stream: new FormControl(data?.stream ? data.stream : null, [Validators.required]),
      price: new FormControl(data?.price ? data.price : null, [Validators.required])
    })
  }

  public override submit(): void {
    if(this.statusEdite !== 'edite'){
    this.mediaFormService.sendMediaChannelsData(this.form.value, this.choicePayment);
    }else {
      this.getAllOffersData();
    }
    this.closePopup()
  }

  private getAllOffersData(){
    this.store.pipe(take(1), select(selectMediaChannels), takeUntil(this.destroy$)).subscribe((data) =>{
      this.mediaChannelsData = data;
      const newOffers: MediaFormInterface = {
        ...this.mediaData,
        name: this.form.value.name,
        link: this.form.value.link,
        subscribe: this.form.value.subscribe,
        stream: this.form.value.stream,
        price: this.form.value.price,
        payout: this.choicePayment
      }
      this.mediaChannelsService.setNewChangesFromForm(newOffers, this.mediaChannelsData)
    })
  }

  public override closePopup(): void {
    this.mediaFormService._isMediaForm = false;
    document.body.style.overflow = '';
  }

  public open(value: string, index: number) {
    this.choicePayment = value;
    this.isOpen = !this.isOpen
    this.isOpenTab[index] = this.isOpen;
  }

}
