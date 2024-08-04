import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthIconsService } from '../../services/authIcon.service';
import { Router } from '@angular/router';
import { Rules, Form } from '../../interfaces/auth.interface';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import {
  selectAllUsers,
  selectUserData,
} from '../../../../../store/selectors/store.selectors';
import { BackendService } from '../../../../../shared/services/backend.service';
import { newUserID } from '../../../../../store/actions/store.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public data: Date = new Date();
  public form: FormGroup;
  public hideRequiredControl = new FormControl(false);
  public hide = true;
  public isRulesChoise: string = null;
  public authRules: Rules[];
  public formData: Form;
  private dataUser;
  public errorData: string;
  private allUsers: any[];

  constructor(
    private authService: AuthService,
    private authIconsService: AuthIconsService,
    private router: Router,
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.initializeDataFromJSON();
    this.backendService.getAlluser();
    this.initializeStorageDataForm();
  }

  ngAfterViewInit(): void {
    this.store
      .pipe(select(selectAllUsers), take(1))
      .subscribe((data) => {
        if (data) {
          this.allUsers = Object.values(data);
        }
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
      this.initializeForm(data);
      this.isRulesChoise = data.rules;
      this.dataUser = data.rules;
    } else {
      this.initializeForm();
    }
  }

  private initializeForm(data = null) {
    this.form = new FormGroup({
      email: new FormControl(data ? data.email : '', [Validators.required, Validators.email]),
      password: new FormControl(data ? data.password : '', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  public choiseRules(rules: string) {
    this.isRulesChoise = rules;
  }

  public submit() {
    this.allUsers.find((e) => {
      if (e.profile.email === this.form.value.email) {
        this.form.value.email = e.profile.email;
        this.form.value.password = e.profile.password;
        this.dataUser = e.profile.rules;
        localStorage.setItem('id', JSON.stringify(e.profile.userID));
        this.store.dispatch(newUserID({ id: e.profile.userID }));
      }
      if (this.isRulesChoise === this.dataUser) {
        const formData = { ...this.form.value, rules: this.isRulesChoise };
        this.authService
          .login(formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            if (data) {
              localStorage.setItem('rules', JSON.stringify(this.isRulesChoise));
              this.router.navigate([`/${this.dataUser}`]).then();
              if (this.hideRequiredControl && this.form.value) {
                localStorage.setItem('save', JSON.stringify(formData));
                this.form.reset();
              }
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}