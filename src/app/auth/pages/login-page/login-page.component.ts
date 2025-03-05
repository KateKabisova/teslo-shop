import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent } from "../../alert/alert/alert.component";
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './login-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class LoginPageComponent {

  fb = inject(FormBuilder);
  router= inject(Router);

  hasError = signal(false);
  isPosting = signal(false);
  authService= inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if(this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe((isValid)=>{
      if(isValid) {
        this.router.navigateByUrl('/');
        return;
      }
      this.hasError.set(true);
    });

  }

}
