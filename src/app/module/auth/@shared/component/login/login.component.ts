import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthIconsService } from '../../services/authIcon.service';
import { Router } from '@angular/router';

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
  public isRulesChoise: 'affiliate' | 'brand' = null;
  private authSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private authIconsService: AuthIconsService,
    private router: Router
  ) { }
  ngOnInit() {
    this.form = new FormGroup<any>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('save')) {
      const data = JSON.parse(localStorage.getItem('save'))
      this.form.value.email = data.email
      this.form.value.password = data.password
      this.isRulesChoise = data.rules

      console.log(this.form.value)
    }
  }

  public choiseRules(rules: 'affiliate' | 'brand') {
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
  }
}
