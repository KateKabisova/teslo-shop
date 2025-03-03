import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AlertComponent } from "../../alert/alert/alert.component";

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {


  fb = inject(FormBuilder);
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);
  authService = inject(AuthService);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { fullName, email, password } = this.registerForm.value;

    this.authService.register( email!, password!, fullName!)
      .subscribe((isValid) => {
        if (isValid) {
          this.router.navigateByUrl('/');
          return;
        }
        this.hasError.set(true);
      });
  }

}
