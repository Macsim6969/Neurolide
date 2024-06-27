import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, take, takeUntil, timer } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthIconsService } from '../../services/authIcon.service';
import { TranslateService } from '@ngx-translate/core';
import { Form, Rules } from '../../interfaces/auth.interface';
import { PopupInfoService } from '../../services/popupInfo.service';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.scss'],
})
export class RegisterManagerComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public data: Date = new Date();
  public form: FormGroup;
  public hideRequiredControl = new FormControl(false);
  public hide = true;
  public authRules: Rules[];
  public formData: Form;
  constructor(
    private authService: AuthService,
    private authIconsService: AuthIconsService,
    private router: Router,
    private translate: TranslateService,
    private popupInfoService: PopupInfoService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.initializeForm();
    this.initializeDataFromJSON();
  }

  ngAfterViewInit(): void {
    this.initializeStorageDataForm();
    this.cd.detectChanges();
  }

  private initializeForm() {
    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      doublePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  private initializeDataFromJSON() {
    this.translate
      .stream('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.authRules = data.rules;
        this.formData = data.form;
      });
  }

  private initializeStorageDataForm() {
    if (localStorage.getItem('save')) {
      const data = JSON.parse(localStorage.getItem('save'));
      this.form.value.name = data.name;
      this.form.value.email = data.email;
      this.form.value.password = data.password;
      this.form.value.doublePassword = data.password;
    }
  }

  public submit() {
    const formData = { ...this.form.value, rules: 'manager' };

    this.authService
      .sigUp(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.popupInfoService._isAlert = true;
        timer(300)
          .pipe(take(1))
          .subscribe(() => {
            data ? this.router.navigate(['/auth/login']).then() : null;
            if (this.hideRequiredControl && this.form.value) {
              localStorage.setItem('save', JSON.stringify(formData));
            }
          });
      });
    this.form.reset();
  }

  public checkToDisable() {
    if (
      this.form.invalid ||
      this.form.value.password !== this.form.value.doublePassword
    ) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
