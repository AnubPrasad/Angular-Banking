
// // import { Component } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { Router } from '@angular/router';
// // import { AuthService } from '../services/auth.service';

// // @Component({
// //   selector: 'app-forgot-password',
// //   templateUrl: './forgot-password.component.html',
// //   styleUrls: ['./forgot-password.component.css']
// // })
// // export class ForgotPasswordComponent {
// //   forgotPasswordForm: FormGroup;
// //   errorMessage = '';
// //   isLoading = false;

// //   constructor(
// //     private fb: FormBuilder,
// //     private authService: AuthService,
// //     private router: Router
// //   ) {
// //     this.forgotPasswordForm = this.fb.group({
// //       customerId: ['', Validators.required],
// //       email: ['', [Validators.required, Validators.email]],
// //       mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
// //     });
// //   }

// //   verifyUser() {
// //     if (this.forgotPasswordForm.valid) {
// //       this.isLoading = true;
// //       this.errorMessage = '';
      
// //       this.authService.verifyUserForPasswordReset(this.forgotPasswordForm.value)
// //         .subscribe({
// //           next: (response) => {
// //             this.isLoading = false;
// //             // Navigate to reset password with a token if your backend provides one
// //             this.router.navigate(['/reset-password'], {
// //               state: { 
// //                 verified: true,
// //                 email: this.forgotPasswordForm.value.email 
// //               }
// //             });
// //           },
// //           error: (err) => {
// //             this.isLoading = false;
// //             this.errorMessage = err.error.message || 'Verification failed. Please check your details.';
// //           }
// //         });
// //     }
// //   }

// //   cancel() {
// //     this.router.navigate(['/login']);
// //   }
// // }


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent {
//   forgotPasswordForm: FormGroup;
//   errorMessage = '';
  
//   // Static validation data (replace with your actual validation logic)
//   private staticValidationData = {
//     customerId: 'c',
//     email: 'e',
//     mobile: '1'
//   };

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.forgotPasswordForm = this.fb.group({
//       customerId: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
//     });
//   }

//   verifyUser() {
//     if (this.forgotPasswordForm.valid) {
//       const formData = this.forgotPasswordForm.value;
      
//       // Static validation - replace with actual API call in real implementation
//       if (formData.customerId === this.staticValidationData.customerId &&
//           formData.email === this.staticValidationData.email &&
//           formData.mobile === this.staticValidationData.mobile) {
        
//         // Navigate to reset password with email in state
//         this.router.navigate(['/reset-password'], {
//           state: { email: formData.email }
//         });
//       } else {
//         this.errorMessage = 'The details you entered do not match our records. Please try again.';
//       }
//     }
//   }

//   cancel() {
//     this.router.navigate(['/login']);
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  errorMessage = '';
  
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.forgotPasswordForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });

    // For debugging - log form status changes
    this.forgotPasswordForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
      console.log('Form errors:', this.forgotPasswordForm.errors);
      console.log('Form values:', this.forgotPasswordForm.value);
    });
  }
verifyUser() {
    if (this.forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;

      // 🔗 API call to backend
      this.http.post<boolean>('http://localhost:5001/api/forgot-password', formData)
        .subscribe({
          next: (isVerified: boolean) => {
            if (isVerified) {
              console.log(this.forgotPasswordForm.value);
              // ✅ Navigate only if response is true
              this.router.navigate(['/reset-password'], {
                state: { email: formData.email }
              });
            } else {
              console.log(this.forgotPasswordForm.value);
              // ❌ Don't show error if false, just return
              return;
            }
          },
          error: (err: any) => {
            console.error('API error:', err);
            // ❌ Still don't show error, just stop here silently
          }
        });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }


  cancel() {
    this.router.navigate(['/login']);
  }
}