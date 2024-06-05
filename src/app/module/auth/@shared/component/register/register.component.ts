import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ThemePalette } from '@angular/material/core';
import { AuthIconsService } from '../../services/authIcon.service';
export interface Task {
  name: string;
  completed: boolean;

}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

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
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      doublePassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('save')) {
      const data = JSON.parse(localStorage.getItem('save'))
      this.form.value.name = data.name
      this.form.value.email = data.email
      this.form.value.password = data.password
      this.form.value.doublePassword = data.password
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
      console.log(data)
      // data ? this.router.navigate(['auth/login']).then() : null;

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
