// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-deposit-money',
//   templateUrl: './deposit-money.component.html',
//   styleUrls: ['./deposit-money.component.css']
// })
// export class DepositMoneyComponent {
//   depositForm = this.fb.group({
//     accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
//     confirmAccountNumber: ['', [Validators.required]],
//     amount: ['', [Validators.required, Validators.min(0.01), Validators.max(100000)]]
//   }, { validator: this.accountNumberMatchValidator });

//   isLoading = false;
//   accountVerified = false; 
//   accountHolderName = '';
//   currentBalance = 0;

//   // Mock data - replace with actual API calls in a real application
//   private mockAccounts = [
//     { accountNumber: '1001', name: 'John Doe', balance: 2500.75 },
//     { accountNumber: '1002', name: 'Jane Smith', balance: 1800.50 },
//     { accountNumber: '1003', name: 'Bob Johnson', balance: 0.00 }
//   ];

//   constructor(private fb: FormBuilder) {}

//   // Custom validator to check if account numbers match
//   accountNumberMatchValidator(group: any) {
//     const accountNumber = group.get('accountNumber').value;
//     const confirmAccountNumber = group.get('confirmAccountNumber').value;
//     return accountNumber === confirmAccountNumber ? null : { mismatch: true };
//   }

//   verifyAccount() {
//     const accountNumber = this.depositForm.get('accountNumber')?.value;
//     const confirmAccountNumber = this.depositForm.get('confirmAccountNumber')?.value;

//     if (accountNumber && accountNumber === confirmAccountNumber) {
//       this.isLoading = true;
      
//       // Simulate API call with timeout
//       setTimeout(() => {
//         const account = this.mockAccounts.find(acc => acc.accountNumber === accountNumber);
        
//         if (account) {
//           this.accountVerified = true;
//           this.accountHolderName = account.name;
//           this.currentBalance = account.balance;
//           alert(`Account verified: ${account.name}`);
//         } else {
//           this.accountVerified = false;
//           alert('Account not found');
//         }
//         this.isLoading = false;
//       }, 1000);
//     }
//   }

//   onSubmit() {
//     if (this.depositForm.valid && this.accountVerified) {
//       this.isLoading = true;
//       const amount = this.depositForm.get('amount')?.value;
      
//       // Simulate API call with timeout
//       setTimeout(() => {
//         alert(`Successfully deposited ${amount} to account ${this.depositForm.get('accountNumber')?.value}`);
//         this.isLoading = false;
//         this.depositForm.reset();
//         this.accountVerified = false;
//         this.accountHolderName = '';
//         this.currentBalance = 0;
//       }, 1500);
//     } else {
//       alert('Please verify account and fill all fields correctly');
//     }
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit-money.component.html',
  styleUrls: ['./deposit-money.component.css']
})
export class DepositMoneyComponent {
  depositForm = this.fb.group({
    accountNumber: ['', [Validators.required]],
    confirmAccountNumber: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(0.01), Validators.max(100000)]]
  }, { validators: this.accountNumberMatchValidator });

  isLoading = false;
  accountVerified = false;
  accountHolderName = '';
  currentBalance = 0;
  accountData: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  accountNumberMatchValidator(group: any) {
    const acc = group.get('accountNumber')?.value;
    const conf = group.get('confirmAccountNumber')?.value;
    return acc === conf ? null : { mismatch: true };
  }

  verifyAccount() {
    const accountNumber = this.depositForm.get('accountNumber')?.value;

    if (!accountNumber) return;

    this.isLoading = true;
    this.http.get(`http://localhost:5100/api/Accounts/${accountNumber}`).subscribe({
      next: (data: any) => {
        if (data.isLocked) {
          alert("Account is locked. Cannot deposit.");
          this.accountVerified = false;
        } else {
          this.accountVerified = true;
          this.accountData = data;
          this.accountHolderName = `Customer ID: ${data.customerID}`;
          this.currentBalance = data.balance;
          alert("Account verified.");
        }
        this.isLoading = false;
      },
      error: () => {
        this.accountVerified = false;
        this.isLoading = false;
        alert("Account not found.");
      }
    });
  }

  // onSubmit() {
  //   if (!this.depositForm.valid || !this.accountVerified) {
  //     alert("Please verify account and fill all fields correctly.");
  //     return;
  //   }

  //   const amount = parseFloat(this.depositForm.get('amount')?.value || '0');
  //   const updatedAccount = { ...this.accountData, balance: this.accountData.balance + amount };

  //   this.isLoading = true;
  //   this.http.put(`http://localhost:5100/api/Accounts/${this.accountData.accountNumber}`, updatedAccount)
  //     .subscribe({
  //       next: () => {
  //         alert(`Successfully deposited ₹${amount} to account ${this.accountData.accountNumber}`);
  //         this.depositForm.reset();
  //         this.accountVerified = false;
  //         this.accountHolderName = '';
  //         this.currentBalance = 0;
  //         this.isLoading = false;
  //       },
  //       error: () => {
  //         alert("Deposit failed. Please try again.");
  //         this.isLoading = false;
  //       }
  //     });
  // }


  onSubmit() {
  if (!this.depositForm.valid || !this.accountVerified) {
    alert("Please verify account and fill all fields correctly.");
    return;
  }

  const amount = parseFloat(this.depositForm.get('amount')?.value || '0');
  const requestBody = {
    accountNumber: this.accountData.accountNumber,
    amount: amount
  };

  this.isLoading = true;
  this.http.post(`http://localhost:5100/api/Accounts/deposit`, requestBody)
    .subscribe({
      next: () => {
        alert(`Successfully deposited ₹${amount} to account ${this.accountData.accountNumber}`);
        this.depositForm.reset();
        this.accountVerified = false;
        this.accountHolderName = '';
        this.currentBalance = 0;
        this.isLoading = false;
      },
      error: (err) => {
        alert("Deposit failed. Please try again.");
        console.error(err);
        this.isLoading = false;
      }
    });
}

}
