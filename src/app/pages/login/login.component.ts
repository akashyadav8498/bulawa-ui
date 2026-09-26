import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-container animate-fade-up">
        
        <div class="logo-container">
          <a routerLink="/"><img src="assets/logo.jpeg" alt="Bulawa Logo" class="logo" /></a>
        </div>

        <div class="login-header">
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              [class.error]="isFieldInvalid('email')"
              placeholder="Enter your email"
            />
            <span class="error-msg" *ngIf="isFieldInvalid('email')">Please enter a valid email.</span>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password"
              [class.error]="isFieldInvalid('password')"
              placeholder="Enter your password"
            />
            <span class="error-msg" *ngIf="isFieldInvalid('password')">Password is required.</span>
          </div>

          <div class="server-error" *ngIf="serverError">
            {{ serverError }}
          </div>

          <button type="submit" class="btn-primary login-btn" [disabled]="loginForm.invalid || isLoading">
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-ivory);
      padding: var(--space-md);
    }
    .login-container {
      background-color: var(--color-white);
      width: 100%;
      max-width: 480px;
      padding: var(--space-xl) var(--space-lg);
      border-radius: 8px;
      box-shadow: 0 20px 40px rgba(44, 42, 41, 0.05);
    }
    .logo-container {
      text-align: center;
      margin-bottom: var(--space-lg);
    }
    .logo {
      height: 40px;
    }
    .login-header {
      text-align: center;
      margin-bottom: var(--space-lg);
    }
    .login-header h1 {
      font-size: 2.5rem;
      margin-bottom: var(--space-xs);
    }
    .login-header p {
      color: rgba(44, 42, 41, 0.6);
      font-size: 1rem;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-group label {
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-earth);
    }
    .form-group input {
      padding: 1rem;
      border: 1px solid var(--color-gray-light);
      background-color: var(--color-ivory);
      font-family: var(--font-sans);
      font-size: 1rem;
      color: var(--color-earth);
      border-radius: 4px;
      transition: border-color var(--duration-normal);
      outline: none;
    }
    .form-group input:focus {
      border-color: var(--color-gold);
    }
    .form-group input.error {
      border-color: #d9534f;
    }
    .error-msg {
      color: #d9534f;
      font-size: 0.75rem;
    }
    .server-error {
      background-color: #fdf2f2;
      color: #d9534f;
      padding: 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      text-align: center;
      border: 1px solid #f9c2c2;
    }
    .login-btn {
      width: 100%;
      margin-top: 1rem;
    }
    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  serverError = '';
  returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || null;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.serverError = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          // Route based on role
          const role = response.roles[0];
          if (role === 'ROLE_DESIGNER') this.router.navigate(['/designer']);
          else if (role === 'ROLE_CUSTOMER') this.router.navigate(['/customer']);
          else if (role === 'ROLE_SUPER_ADMIN') this.router.navigate(['/admin']);
          else this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401 || err.status === 403) {
          this.serverError = 'Invalid email or password.';
        } else {
          this.serverError = 'An error occurred. Please try again.';
        }
      }
    });
  }
}
