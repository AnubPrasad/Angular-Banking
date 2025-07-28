// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-fund-transfer',
//   templateUrl: './fund-transfer.component.html',
//   styleUrls: ['./fund-transfer.component.css']
// })
// export class FundTransferComponent {

// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
})
export class FundTransferComponent {
  transferForm: FormGroup;
  submitted = false;
  responseMessage = '';

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      fromAccount: ['', [Validators.required, Validators.pattern(/^\d{10,20}$/)]],
      toAccount: ['', [Validators.required, Validators.pattern(/^\d{10,20}$/)]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get f() {
    return this.transferForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.transferForm.valid) {
      // Simulate success/failure
      const success = Math.random() > 0.2; // 80% success rate
      this.responseMessage = success
        ? '✅ Fund transferred successfully!'
        : '❌ Fund transfer failed. Please try again.';
    } else {
      this.responseMessage = '❌ Please fill all fields correctly.';
    }

    setTimeout(() => (this.responseMessage = ''), 4000);
  }
}
