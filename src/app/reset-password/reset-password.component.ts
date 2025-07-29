import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  email = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Get email from navigation state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {email: string};
    this.email = state?.email || '';

    if (!this.email) {
      this.router.navigate(['/forgot-password']);
    }

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        this.hasNumberValidator(),
        this.hasSpecialCharValidator()
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validators
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    return newPassword && confirmPassword && newPassword.value !== confirmPassword.value 
      ? { mismatch: true } 
      : null;
  };

  hasNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasNumber = /\d/.test(control.value);
      return hasNumber ? null : { hasNumber: true };
    };
  }

  hasSpecialCharValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
      return hasSpecialChar ? null : { hasSpecialChar: true };
    };
  }

  // Helper methods for template
  hasNumber(): boolean {
    return /\d/.test(this.resetPasswordForm.get('newPassword')?.value);
  }

  hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.resetPasswordForm.get('newPassword')?.value);
  }

  // resetPassword() {
    // if (this.resetPasswordForm.valid) {
    //   this.isLoading = true;
    //   this.errorMessage = '';
    //   this.successMessage = ''; 

    //   const resetData = {
    //     email: this.email,
    //     newPassword: this.resetPasswordForm.value.newPassword
    //   };

    //   this.authService.resetPassword(resetData)
    //     .subscribe({
    //       next: (response) => {
    //         this.isLoading = false;
    //         this.successMessage = 'Password reset successfully! You can now login with your new password.';
    //         // Auto navigate to login after 3 seconds
    //         setTimeout(() => {
    //           this.router.navigate(['/login']);
    //         }, 3000);
    //       },
    //       error: (err) => {
    //         this.isLoading = false;
    //         this.errorMessage = err.error.message || 'Password reset failed. Please try again.';
    //       }
    //     });
    // }
  // }

  resetPassword() {
  if (this.resetPasswordForm.valid) {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const resetData = {
      email: this.email,
      newPassword: this.resetPasswordForm.value.newPassword
    };

    this.authService.resetPassword(resetData)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Password reset successfully! You can now login with your new password.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message || 'Password reset failed. Please try again.';
        }
      });
  } else {
    this.errorMessage = 'Please fix validation errors before submitting.';
  }
}

}