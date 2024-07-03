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
import { TranslateService } from '@ngx-translate/core';
import { PopupEditeInterface } from '../../interfaces/popup.interface';
import { FirebaseStorageService } from '../../../../../services/firebase-storage.service';

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
  public popupData: PopupEditeInterface;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private authService: AuthService,
    private backendService: BackendService,
    private profileService: ProfileServices,
    private translate: TranslateService,
    private firebaseStorageService: FirebaseStorageService
  ) { }

  ngOnInit(): void {
    this.streamPopupEditeData();
    this.initializeUserDataFromStore();
    this.initializeForm();
  }

  private streamPopupEditeData() {
    this.translate.stream('user.popupEdite')
      .pipe(takeUntil(this.destroy$)).subscribe((data: PopupEditeInterface) => {
        this.popupData = data;
      })
  }

  private initializeForm() {
    this.form = new FormGroup<any>({
      name: new FormControl(this.userInfo.name, [Validators.required]),
      surname: new FormControl(this.userInfo.surname, [Validators.required]),
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

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  public submit() {
    if (!this.form.value.name) {
      this.form.value.name = this.userInfo.name;
    }
    if (!this.form.value.password) {
      this.form.value.password = this.userInfo.password;
    }
    if (!this.form.value.surname) {
      this.form.value.surname = this.userInfo.surname;
    }
    if (!this.form.value.email) {
      this.form.value.email = this.userInfo.email;
    }
    if (!this.selectedFile) {
      this.form.value.avatar = this.userInfo.avatar;
    } else {
      this.form.value.avatar = this.selectedFile.name;
      const filePath = `images/${this.selectedFile.name}`;
      this.firebaseStorageService.uploadImage(this.selectedFile, filePath);
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
      surname: this.form.value.surname,
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
