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

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent {
  profileForm: FormGroup;
  successMessage = '';
  submitted = false;
  isLoading = false;

  private apiUrl = 'http://localhost:5001/api/update-customer';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
        ]
      ]
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.profileForm.valid) {
      this.isLoading = true;
      this.successMessage = '';

      this.http.post<any>(this.apiUrl, this.profileForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response.message || '✅ Profile updated successfully!';
          this.profileForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.successMessage =
            err.error?.message || '❌ Update failed. Please try again.';
        }
      });
    } else {
      this.successMessage = '❌ Please fix the validation errors.';
    }

    setTimeout(() => (this.successMessage = ''), 4000);
  }
}
