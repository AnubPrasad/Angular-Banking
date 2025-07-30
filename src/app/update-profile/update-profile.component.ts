// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-update-profile',
//   templateUrl: './update-profile.component.html',
//   styleUrls: ['./update-profile.component.css']
// })
// export class UpdateProfileComponent {

// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent {
  profileForm: FormGroup;
  successMessage = '';
  submitted = false;
  isLoading = false;

  // private apiUrl = 'http://localhost:5100/api/customers';

  customerId: number | null = null;
userData: any;

  constructor(private fb: FormBuilder, private http: HttpClient,  private authService: AuthService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)]
      ],
      password: [
        ''
      ]
    });
  }

ngOnInit(): void {
  // this.userData = this.authService.getCustomerDetails();
  
  if (this.userData?.username) {
    this.http.get<any[]>('http://localhost:5100/api/customers')
      .subscribe({
        next: (customers) => {
          const matchedCustomer = customers.find(c => c.name === this.userData.username);
          if (matchedCustomer) {
            this.customerId = matchedCustomer.customerID;

            // Optionally pre-fill form with their info
            this.profileForm.patchValue({
              name: matchedCustomer.name,
              email: matchedCustomer.email,
              phone: matchedCustomer.phone,
              password: matchedCustomer.password
            });
          }
        },
        error: (err) => {
          console.error('Failed to fetch customers:', err);
        }
      });
  }
}



  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.profileForm.valid) {
      this.isLoading = true;
      this.successMessage = '';

      // this.http.put<any>(this.apiUrl, this.profileForm.value).subscribe({
      //   next: (response) => {
      //     this.isLoading = false;
      //     this.successMessage = response.message || '✅ Profile updated successfully!';
      //     this.profileForm.reset();
      //     this.submitted = false;
      //   },
      //   error: (err) => {
      //     this.isLoading = false;
      //     this.successMessage =
      //       err.error?.message || '❌ Update failed. Please try again.';
      //   }
      // });
    if (this.customerId !== null) {
  const url = `http://localhost:5100/api/customers/${this.customerId}`;
  this.http.put(url, this.profileForm.value).subscribe({
    next: (response) => {
      console.log("Updating with:", this.profileForm.value);
      this.isLoading = false;
      this.successMessage = '✅ Profile updated successfully!';
      this.profileForm.reset();
      this.submitted = false;
    },
    error: (err) => {
      this.isLoading = false;
      this.successMessage = '❌ Update failed. Please try again.';
    }
  });
}
    } else {
      this.successMessage = '❌ Please fix the validation errors.';
    }

    setTimeout(() => (this.successMessage = ''), 4000);
  }
}
