import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthIconsService } from '../../services/authIcon.service';
import { Router } from '@angular/router';
import { Rules, Form } from '../../interfaces/auth.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  public data: Date = new Date();
  public form: FormGroup;
  public hideRequiredControl = new FormControl(false);
  public hide = true;
  public isRulesChoise: string = null;
  public authRules: Rules[];
  public formData: Form;
  private authSubscription: Subscription;
  private translateSubscription: Subscription;
  private dataUser;
  public errorData: string;
  constructor(
    private authService: AuthService,
    private authIconsService: AuthIconsService,
    private router: Router,
    private translate: TranslateService
  ) { }
  ngOnInit() {
    this.initializeForm();
    this.initializeDataFromJSON();
  }

  ngAfterViewInit(): void {
    this.initializeStorageDataForm();
  }

  private initializeForm() {
    this.form = new FormGroup<any>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  private initializeDataFromJSON() {
    this.translateSubscription = this.translate.stream('auth').subscribe((data) => {
      this.authRules = data.rules;
      this.formData = data.form;
    })
  }

  private initializeStorageDataForm() {
    if (localStorage.getItem('save')) {
      const data = JSON.parse(localStorage.getItem('save'))
      this.form.value.email = data.email
      this.form.value.password = data.password
      this.isRulesChoise = data.rules
      this.dataUser = data.rules
    }
  }



  public choiseRules(rules: string) {
    this.isRulesChoise = rules;
  }

  public submit() {
    if (this.isRulesChoise === this.dataUser) {
      const formData = { ...this.form.value, rules: this.isRulesChoise }

      this.authSubscription = this.authService.login(formData).subscribe((data) => {
        data ? this.router.navigate(['/manager']).then() : null;
        if (this.hideRequiredControl && this.form.value) {
          localStorage.setItem('save', JSON.stringify(formData))
          this.form.reset()
        }
      })
    } else {
      this.errorData = 'Account has another rule'
    }

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.translateSubscription.unsubscribe();
  }
}
