import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthIconsService } from '../../services/authIcon.service';
import { TranslateService } from '@ngx-translate/core';
import { Form, Rules } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  public data: Date = new Date();
  public form: FormGroup;
  public hideRequiredControl = new FormControl(false);
  public hide = true;
  public isRulesChoise: string = null;
  public authRules: Rules[];
  public formData: Form;
  private translateSubscription: Subscription;
  private authSubscription: Subscription;
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
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      doublePassword: new FormControl('', [Validators.required, Validators.minLength(8)])
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
      this.form.value.name = data.name
      this.form.value.email = data.email
      this.form.value.password = data.password
      this.form.value.doublePassword = data.password
      this.isRulesChoise = data.rules
    }
  }

  public choiseRules(rules: string) {
    this.isRulesChoise = rules;
  }

  public submit() {
    const formData = { ...this.form.value, rules: this.isRulesChoise }

    this.authSubscription = this.authService.sigUp(formData).subscribe((data) => {
      data ? this.router.navigate(['auth/login']).then() : null;
      if (this.hideRequiredControl && this.form.value) {
        localStorage.setItem('save', JSON.stringify(formData))
      }
    })
    this.form.reset()
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.translateSubscription.unsubscribe();
  }
}
