import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectUserData } from '../../../../../store/selectors/store.selectors';
import { AuthService } from '../../../../auth/@shared/services/auth.service';
import { BackendService } from '../../../../../shared/services/backend.service';
import { UserData } from '../../../../../shared/interfaces/backend.interface';
import { ProfileServices } from '../../services/profile.service';

@Component({
  selector: 'app-popup-edite',
  templateUrl: './popup-edite.component.html',
  styleUrls: ['./popup-edite.component.scss']
})
export class PopupEditeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public userInfo: UserData
  public form: FormGroup;
  public selectedFile: File | null = null;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private authService: AuthService,
    private backendService: BackendService,
    private profileService: ProfileServices

  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromStore();
    this.initializeForm();

  }

  private initializeForm() {
    this.form = new FormGroup<any>({
      name: new FormControl(this.userInfo.name, [Validators.required]),
      address: new FormControl(this.userInfo.address, [Validators.required]),
      number: new FormControl(this.userInfo.number, [Validators.required]),
      password: new FormControl(this.userInfo.password, [Validators.required, Validators.minLength(8)]),
      avatar: new FormControl('', [Validators.required])
    })
  }

  private initializeUserDataFromStore() {
    this.store.pipe(select(selectUserData)).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data && Object.keys(data).length > 1) {
        this.userInfo = data;
      } else {
        this.userInfo = Object.values(data)[0]
      }
    })
  }

  public submit() {
    if (!this.form.value.name) {
      this.form.value.name = this.userInfo.name;
    }
    if (!this.form.value.password) {
      this.form.value.password = this.userInfo.password;
    }
    if (!this.form.value.address) {
      this.form.value.address = this.userInfo.address;
    }
    if (!this.form.value.email) {
      this.form.value.email = this.userInfo.email;
    }
    if (!this.form.value.avatar) {
      this.form.value.avatar = this.userInfo.avatar;
    }
    if (this.form.value.number === null || this.form.value.number === undefined) {
      this.form.value.number = this.userInfo.number;
    }

    this.setDataToStore();
  }

  private changePassword() {
    this.authService.resetPassword(this.form.value.email, this.form.value.password).subscribe(
      response => {
        console.log('Password changed successfully', response);
      },
      error => {
        console.error('Error changing password:', error);
      }
    );
  }

  private setDataToStore() {
    const newUserData: UserData = {
      ...this.userInfo,
      userID: this.userInfo.userID,
      email: this.form.value.email,
      name: this.form.value.name,
      password: this.form.value.password,
      address: this.form.value.address,
      number: this.form.value.number,
      rules: this.userInfo.rules,
      avatar: this.form.value.avatar
    }

    if (this.form.value.password !== this.userInfo.password) {
      this.changePassword()
    }
    this.backendService.sendUserProfile(newUserData);
    this.form.reset()
    this.profileService._isPopup = false;
  }

  public closePopup() {
    this.profileService._isPopup = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
