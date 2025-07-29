// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   // loginForm = this.fb.group({
//   //   username: ['', Validators.required],
//   //   password: ['', Validators.required]
//   // });
//   loginForm = this.fb.group({
//   email: ['', [Validators.required, Validators.email]],
//   password: ['', Validators.required]
// });

//   errorMessage = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   onSubmit() {
//     if (this.loginForm.valid) {
//       // const { username, password } = this.loginForm.value;
//       // this.authService.login(username!, password!).subscribe({
//       const { email, password } = this.loginForm.value;
// this.authService.login(email!, password!).subscribe({
//         next: (success) => {
//           if (!success) {
//             this.errorMessage = 'Invalid username or password';
//           }
//         },
//         error: () => {
//           this.errorMessage = 'Login failed. Please try again.';
//         }
//       });
//     }
//   }

//   navigateToSignup() {
//     this.router.navigate(['/signup']);
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
  username: ['', Validators.required],
  password: ['', Validators.required]
});

  }

//    onSubmit() {
//     if (this.loginForm.valid) {
//       // const { username, password } = this.loginForm.value;
//       // this.authService.login(username!, password!).subscribe({
//       const { email, password } = this.loginForm.value;
// this.authService.login(email!, password!).subscribe({
//         next: (success) => {
//           if (!success) {
//             this.errorMessage = 'Invalid username or password';
//           }
//         },
//         error: () => {
//           console.log(this.loginForm.value);
//           this.errorMessage = 'Login failed. Please try again.';
//         }
//       });
//     }
//   }

onSubmit() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (success) => {
        if (!success) {
          this.errorMessage = 'Invalid username or password';
        }
      },
      error: () => {
        console.log(this.loginForm.value);
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
}


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}