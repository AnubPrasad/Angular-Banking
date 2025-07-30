// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-fund-transfer',
//   templateUrl: './fund-transfer.component.html',
//   styleUrls: ['./fund-transfer.component.css']
// })
// export class FundTransferComponent {

// }


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-fund-transfer',
//   templateUrl: './fund-transfer.component.html',
// })
// export class FundTransferComponent {
//   transferForm: FormGroup;
//   submitted = false;
//   responseMessage = '';

//   constructor(private fb: FormBuilder) {
//     this.transferForm = this.fb.group({
//       fromAccount: ['', [Validators.required, Validators.pattern(/^\d{10,20}$/)]],
//       toAccount: ['', [Validators.required, Validators.pattern(/^\d{10,20}$/)]],
//       amount: ['', [Validators.required, Validators.min(1)]],
//     });
//   }

//   get f() {
//     return this.transferForm.controls;
//   }

//   onSubmit() {
//     this.submitted = true;

//     if (this.transferForm.valid) {
//       // Simulate success/failure
//       const success = Math.random() > 0.2; // 80% success rate
//       this.responseMessage = success
//         ? '✅ Fund transferred successfully!'
//         : '❌ Fund transfer failed. Please try again.';
//     } else {
//       this.responseMessage = '❌ Please fill all fields correctly.';
//     }

//     setTimeout(() => (this.responseMessage = ''), 4000);
//   }
// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
})
export class FundTransferComponent {
  transferForm: FormGroup;
  submitted = false;
  responseMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.transferForm = this.fb.group({
      fromAccount: ['', [Validators.required]],
      toAccount: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get f() {
    return this.transferForm.controls;
  }

  onSubmit() {
  this.submitted = true;

  const transferData = this.transferForm.value;

  this.http.post<any>('http://localhost:5100/api/Transactions/transfer', transferData)
    .subscribe({
      next: (res) => {
        console.log(res);
        if (res && res.status === 'Success') {
          this.responseMessage = `✅ Transfer successful! ₹${res.amount} sent from ${res.from} to ${res.to} on ${new Date(res.date).toLocaleString()}`;
        } else {
          this.responseMessage = '❌ Transfer failed.';
        }
      },
      error: (err) => {
        console.error('Transfer error:', err);
        this.responseMessage = '❌ Error while processing transaction.';
      }
    });

  setTimeout(() => (this.responseMessage = ''), 4000);
}

}
