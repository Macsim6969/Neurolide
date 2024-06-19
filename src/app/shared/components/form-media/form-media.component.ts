import { Component } from '@angular/core';
import { BasePopupComponent } from '../../../module/balance/@shared/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MediaFormService } from '../../../module/media-chanels/@shared/services/mediaForm.service';

@Component({
  selector: 'app-form-media',
  templateUrl: './form-media.component.html',
  styleUrls: ['./form-media.component.scss']
})
export class FormMediaComponent extends BasePopupComponent {

  constructor(
    private mediaFormService: MediaFormService
  ) {
    super();
    super.ngOnInit();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  protected override initializeForm(): void {
    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      subscribe: new FormControl('', [Validators.required, Validators.maxLength(19)]),
      stream: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    })
  }

  public override submit(): void {
    this.mediaFormService.sendMediaChannelsData(this.form.value);
    this.closePopup()
  }

  public override closePopup(): void {
    this.mediaFormService._isMediaForm = false;
    document.body.style.overflow = '';
  }

}
