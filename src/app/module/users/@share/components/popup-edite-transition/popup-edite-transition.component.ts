import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../../../../shared/services/backend.service';
import { Subject, Subscription, combineLatest, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../../../../shared/interfaces/backend.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-popup-edite-transition',
  templateUrl: './popup-edite-transition.component.html',
  styleUrls: ['./popup-edite-transition.component.scss']
})
export class PopupEditetTransitionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public transactionData: any;
  public userInfoTransaction: any;
  public activeId: string;
  public key: number;
  public userId: string;
  public form: FormGroup;

  constructor(
    private backendService: BackendService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromStore();
    this.initializeForm();
    document.body.style.overflow = 'hidden';
  }

  private initializeUserDataFromStore() {
    combineLatest([
      this.userService._transitionData$,
      this.userService._activeTransition$,
      this.userService._activeTransitionId$,
      this.userService._userId$
    ]).pipe(takeUntil(this.destroy$)).subscribe(([data, activeId, key, userId]) => {
      this.userInfoTransaction = data;
      this.activeId = activeId;
      this.key = key;
      this.userId = userId;
      this.transactionData = this.userInfoTransaction.find(e => e.nomer === activeId)
    });

  }

  private initializeForm() {
    this.form = new FormGroup<any>({
      number: new FormControl(this.transactionData.nomer, [Validators.required]),
      invoiceData: new FormControl(this.transactionData.data, [Validators.required]),
      dataPayment: new FormControl(this.transactionData.termin, [Validators.required]),
      status: new FormControl(this.transactionData.status, [Validators.required]),
      paymentMethod: new FormControl(this.transactionData.method, [Validators.required]),
      subscribe: new FormControl(this.transactionData.subscription, [Validators.required]),
      suma: new FormControl(this.transactionData.kwota, [Validators.required])
    })
  }

  public submit() {
    if (!this.form.value.number) {
      this.form.value.number = this.transactionData.nomer;
    }
    if (!this.form.value.invoiceData) {
      this.form.value.invoiceData = this.transactionData.data;
    }
    if (!this.form.value.dataPayment) {
      this.form.value.dataPayment = this.transactionData.termin;
    }
    if (!this.form.value.status) {
      this.form.value.status = this.transactionData.status;
    }
    if (!this.form.value.paymentMethod) {
      this.form.value.paymentMethod = this.transactionData.method;
    }
    if (!this.form.value.subscribe) {
      this.form.value.subscribe = this.transactionData.subscription;
    }
    if (!this.form.value.suma) {
      this.form.value.suma = this.transactionData.kwota;
    }

    this.setDataToStore();
  }


  private setDataToStore() {
    const newUserData: UserData = {
      ...this.userInfoTransaction,
      [this.key]: {
        nomer: this.form.value.number,
        data: this.form.value.invoiceData,
        termin: this.form.value.dataPayment,
        method: this.form.value.paymentMethod,
        status: this.form.value.status,
        subscription: this.form.value.subscribe,
        kwota: this.form.value.suma
      }
    }

    this.backendService.setUserTransitionHistory(this.userId, newUserData);
    this.form.reset()
    this.userService._isTransitionPopup = false;
    this.userService._isUser = false;
  }

  public closePopup() {
    this.userService._isTransitionPopup = false;
    this.userService._isUser = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.body.style.overflow = '';
  }
}
