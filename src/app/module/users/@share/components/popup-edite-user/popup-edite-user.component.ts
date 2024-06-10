import { Component } from '@angular/core';
import { BackendService } from '../../../../../shared/services/backend.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../../../../shared/interfaces/backend.interface';
import { AuthService } from '../../../../auth/@shared/services/auth.service';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectUserData } from '../../../../../store/selectors/store.selectors';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-popup-edite-user',
  templateUrl: './popup-edite-user.component.html',
  styleUrls: ['./popup-edite-user.component.scss']
})
export class PopupEditeUserComponent {
  public userInfo: any;
  public form: FormGroup;
  private userDataSubscription: Subscription;

  constructor(
    private store: Store<{ store: StoreInterface }>,
    private authService: AuthService,
    private backendService: BackendService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromStore();
    this.initializeForm();

  }

  private initializeUserDataFromStore() {
    this.userDataSubscription = this.userService._isUser$.subscribe((data) => {
      this.userInfo = data;
    })
  }

  private initializeForm() {
    this.form = new FormGroup<any>({
      name: new FormControl(this.userInfo.profile.name, [Validators.required]),
      email: new FormControl(this.userInfo.profile.email, [Validators.required, Validators.email]),
      balance: new FormControl(this.userInfo.monitoring.balance, [Validators.required]),
      transactions: new FormControl(this.userInfo.monitoring.transactions, [Validators.required]),
    })
  }

  public submit() {
    if (!this.form.value.name) {
      this.form.value.name = this.userInfo.profile.name;
    }
    if (!this.form.value.email) {
      this.form.value.email = this.userInfo.email;
    }
    if (!this.form.value.balance) {
      this.form.value.balance = this.userInfo.monitoring.balance;
    }
    if (!this.form.value.transactions) {
      this.form.value.transactions = this.userInfo.monitoring.transactions;
    }

    this.setDataToStore();
  }


  private setDataToStore() {
    const newUserData: UserData = {
      ...this.userInfo,
      profile: {
        ...this.userInfo.profile,
        name: this.form.value.name,
        email: this.form.value.email
      },
      monitoring: {
        ...this.userInfo.monitoring,
        transactions: this.form.value.transactions,
        balance: this.form.value.balance,
      }
    }

    this.backendService.updateUserData(newUserData);
    this.form.reset()
    this.userService._isUserPopup = false;
    this.userService._isUser = false;
  }

  public closePopup() {
    this.userService._isUserPopup = false;
    this.userService._isUser = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();

  }
}
