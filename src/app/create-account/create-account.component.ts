// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-create-account',
// //   templateUrl: './create-account.component.html',
// //   styleUrls: ['./create-account.component.css']
// // })
// // export class CreateAccountComponent {

// // }
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-create-account',
//   templateUrl: './create-account.component.html',
// })
// export class CreateAccountComponent {
//   accountForm: FormGroup;
//   submitted = false;
//   statusMessage = '';

//   constructor(private fb: FormBuilder) {
//     this.accountForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
//       address: ['', Validators.required],
//     });
//   }

//   get f() {
//     return this.accountForm.controls;
//   }

//   onSubmit() {
//     this.submitted = true;

//     if (this.accountForm.valid) {
//       console.log(this.accountForm.value);
//       this.statusMessage = '✅ Customer account created successfully!';
//     } else {
//       this.statusMessage = '❌ Failed to create account. Please check the fields.';
//     }

//     setTimeout(() => (this.statusMessage = ''), 4000);
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent {
  accountForm: FormGroup;
  submitted = false;
  statusMessage = '';
  isLoading = false;

  private apiUrl = 'http://localhost:5100/api/Customers';

  // http://localhost:5100/api/Customers
  // http://localhost:5100/api/Customers

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
    });
  }

  get f() {
    return this.accountForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.accountForm.valid) {
      this.isLoading = true;
      this.statusMessage = '';

      this.http.post<any>(this.apiUrl, this.accountForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.statusMessage = '✅ Customer account created successfully!';
          this.accountForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.statusMessage =
            err.error?.message || '❌ Failed to create account. Please try again.';
        },
      });
    } else {
      this.statusMessage = '❌ Please fill all fields correctly.';
    }

    // Auto-clear message after 4 seconds
    setTimeout(() => (this.statusMessage = ''), 4000);
  }
}
