// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-apply-loan',
//   templateUrl: './apply-loan.component.html',
//   styleUrls: ['./apply-loan.component.css']
// })
// export class ApplyLoanComponent {

// }

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-apply-loan',
//   templateUrl: './apply-loan.component.html',
//   styleUrls: ['./apply-loan.component.css'],
// })
// export class ApplyLoanComponent {
//   loanForm: FormGroup;
//   message = '';

//   constructor(private fb: FormBuilder) {
//     this.loanForm = this.fb.group({
//       customerId: ['', Validators.required],
//       loanAmount: ['', [Validators.required, Validators.min(1000)]],
//       duration: ['', [Validators.required, Validators.min(1)]],
//     });
//   }

//   onSubmit() {
//     if (this.loanForm.valid) {
//       console.log(this.loanForm.value);
//       this.message = 'Loan application submitted successfully!';
//     } else {
//       this.message = 'Please fill in all required fields correctly.';
//     }

//     setTimeout(() => (this.message = ''), 3000);
//   }
// }



// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient, HttpParams } from '@angular/common/http';

// @Component({
//   selector: 'app-apply-loan',
//   templateUrl: './apply-loan.component.html',
//   styleUrls: ['./apply-loan.component.css'],
// })
// export class ApplyLoanComponent {
//   loanForm: FormGroup;
//   message = '';

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.loanForm = this.fb.group({
//   customerID: ['', Validators.required],
//   amount: ['', [Validators.required, Validators.min(1000)]],
//   interestRate: ['', [Validators.required, Validators.min(0)]],
//   durationInMonths: ['', [Validators.required, Validators.min(1)]],
// });

//   }

//   // onSubmit() {
//   //   if (this.loanForm.valid) {
//   //     const { customerId, loanAmount, duration } = this.loanForm.value;

//   //     const params = new HttpParams()
//   //       .set('customerId', customerId)
//   //       .set('loanAmount', loanAmount)
//   //       .set('duration', duration);

//   //     this.http.get<any>('http://localhost:5100/api/Loans', { params })
//   //       .subscribe({
//   //         next: (res) => {
//   //           this.message = res.success ? '✅ ' + res.message : '❌ ' + res.message;
//   //         },
//   //         error: (err) => {
//   //           this.message = '❌ Failed to apply for loan. Try again.';
//   //         }
//   //       });
//   //   } else {
//   //     this.message = '❌ Please fill in all required fields correctly.';
//   //   }

//   //   setTimeout(() => (this.message = ''), 4000);
//   // }


// // onSubmit() {
// //   if (this.loanForm.valid) {
// //     const formValue = this.loanForm.value;

// //     const loanPayload = {
// //       loanID: 0,
// //       customerID: formValue.customerID,
// //       amount: formValue.amount,
// //       interestRate: 6.5,
// //       durationInMonths: formValue.durationInMonths,
// //       status: 'Pending',
// //       customer: {
// //         customerID: formValue.customerID
// //         // optionally include other properties if required
// //       }
// //     };

// //     this.http.post<any>('http://localhost:5100/api/Loans', loanPayload)
// //       .subscribe({
// //         next: (res) => {
// //           this.message = '✅ Loan applied successfully!';
// //         },
// //         error: (err) => {
// //           this.message = '❌ Failed to apply for loan.';
// //           console.error(err);
// //         }
// //       });
// //   } else {
// //     this.message = '❌ Please fill in all required fields correctly.';
// //   }

// //   setTimeout(() => (this.message = ''), 4000);
// // }


// onSubmit() {
//   if (this.loanForm.valid) {
//     const formValues = this.loanForm.value;

//     const payload = {
//       loanID: 0,
//       customerID: Number(formValues.customerId),
//       amount: Number(formValues.loanAmount),
//       interestRate: 6.5, // Example hardcoded value
//       durationInMonths: Number(formValues.duration),
//       status: 'Pending',
//       customer: ''
//     };

//     this.http.post<any>('http://localhost:5100/api/Loans', payload)
//       .subscribe({
//         next: (res) => {
//           this.message = '✅ Loan application submitted!';
//         },
//         error: (err) => {
//           this.message = '❌ Failed to submit loan application.';
//         }
//       });
//   } else {
//     this.message = '❌ Please fill in all required fields correctly.';
//   }

//   setTimeout(() => (this.message = ''), 4000);
// }


// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css'],
})
export class ApplyLoanComponent {
  loanForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loanForm = this.fb.group({
      customerId: ['', Validators.required],
      loanAmount: ['', [Validators.required, Validators.min(1000)]],
      interestRate: ['', [Validators.required, Validators.min(1)]],
      durationInMonths: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.loanForm.valid) {
      const form = this.loanForm.value;

      const payload = {
        loanID: 0, // backend will ignore or auto-generate this
        customerID: Number(form.customerId),
        amount: Number(form.loanAmount),
        interestRate: Number(form.interestRate),
        durationInMonths: Number(form.durationInMonths),
        status: 'Pending'
      };

      this.http.post<any>('http://localhost:5100/api/Loans', payload)
        .subscribe({
          next: () => {
            this.message = '✅ Loan application submitted!';
            this.loanForm.reset();
          },
          error: () => {
            this.message = '❌ Failed to submit loan application.';
          }
        });
    } else {
      this.message = '❌ Please fill in all required fields correctly.';
    }

    setTimeout(() => (this.message = ''), 4000);
  }
}
