import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // public form: FormGroup;
  // private authSubscription: Subscription;
  // constructor(
  //   private authService: AuthService,
  //   private router: Router
  // ) { }
  // ngOnInit() {
  //   this.form = new FormGroup<any>({
  //     name: new FormControl('', [Validators.required]),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  //   })
  // }

  // public submit() {
  //   const formData = { ...this.form.value }
  //   this.form.reset()

  //   this.authSubscription = this.authService.sigUp(formData).subscribe((data) => {
  //     data ? this.router.navigate(['auth/login']).then() : null;
  //   })
  // }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
}
