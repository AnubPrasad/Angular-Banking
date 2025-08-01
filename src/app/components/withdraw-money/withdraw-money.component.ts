// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-withdraw-money',
//   templateUrl: './withdraw-money.component.html',
//   styleUrls: ['./withdraw-money.component.css']
// })
// export class WithdrawMoneyComponent {
//   withdrawForm = this.fb.group({
//     accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
//     confirmAccountNumber: ['', [Validators.required]],
//     amount: ['', [Validators.required, Validators.min(0.01)]]
//   }, { validator: this.accountNumberMatchValidator });

//   isLoading = false;
//   accountVerified = false;
//   accountHolderName = '';
//   currentBalance = 0;

//   // Mock data - replace with actual API calls in a real application
//   private mockAccounts = [
//     { accountNumber: '1001', name: 'John Doe', balance: 2500.75 },
//     { accountNumber: '1002', name: 'Jane Smith', balance: 1800.50 },
//     { accountNumber: '1003', name: 'Bob Johnson', balance: 500.00 }
//   ];

//   constructor(private fb: FormBuilder) {}

//   // Custom validator to check if account numbers match
//   accountNumberMatchValidator(group: any) {
//     const accountNumber = group.get('accountNumber')?.value;
//     const confirmAccountNumber = group.get('confirmAccountNumber')?.value;
//     return accountNumber === confirmAccountNumber ? null : { mismatch: true };
//   }

//   verifyAccount() {
//     const accountNumber = this.withdrawForm.get('accountNumber')?.value;
//     const confirmAccountNumber = this.withdrawForm.get('confirmAccountNumber')?.value;

//     if (accountNumber && accountNumber === confirmAccountNumber) {
//       this.isLoading = true;
      
//       // Simulate API call with timeout
//       setTimeout(() => {
//         const account = this.mockAccounts.find(acc => acc.accountNumber === accountNumber);
        
//         if (account) {
//           this.accountVerified = true;
//           this.accountHolderName = account.name;
//           this.currentBalance = account.balance;
//           alert(`Account verified: ${account.name}\nCurrent Balance: $${account.balance.toFixed(2)}`);
//         } else {
//           this.accountVerified = false;
//           alert('Account not found');
//         }
//         this.isLoading = false;
//       }, 1000);
//     }
//   }

//   onSubmit() {
//     if (this.withdrawForm.valid && this.accountVerified) {
//       const amount = parseFloat(this.withdrawForm.get('amount')?.value);
      
//       if (amount > this.currentBalance) {
//         alert('Withdrawal failed: Insufficient funds');
//         return;
//       }

//       this.isLoading = true;
      
//       // Simulate API call with timeout
//       setTimeout(() => {
//         const newBalance = this.currentBalance - amount;
//         alert(`Successfully withdrew $${amount.toFixed(2)} from account ${this.withdrawForm.get('accountNumber')?.value}\nNew Balance: $${newBalance.toFixed(2)}`);
//         this.isLoading = false;
//         this.withdrawForm.reset();
//         this.accountVerified = false;
//         this.accountHolderName = '';
//         this.currentBalance = 0;
//       }, 1500);
//     } else {
//       alert('Please verify account and fill all fields correctly');
//     }
//   }

//   // Helper function to format as currency
//   private formatCurrency(amount: number): string {
//     return '$' + amount.toFixed(2);
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent {
  withdrawForm = this.fb.group({
    accountNumber: [''],
    confirmAccountNumber: [''],
    amount: ['', [Validators.required, Validators.min(1)]]
  }, { validator: this.accountNumberMatchValidator });

  isLoading = false;
  accountVerified = false;
  accountHolderName = '';
  currentBalance = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  accountNumberMatchValidator(group: any) {
    const accountNumber = group.get('accountNumber')?.value;
    const confirmAccountNumber = group.get('confirmAccountNumber')?.value;
    return accountNumber === confirmAccountNumber ? null : { mismatch: true };
  }

  verifyAccount() {
    const accountNumber = this.withdrawForm.get('accountNumber')?.value;
    if (!accountNumber) return;

    this.isLoading = true;

    // Replace with real backend API
    this.http.get<any>(`http://localhost:5100/api/Accounts/${accountNumber}`)
      .pipe(catchError(err => {
        alert('Account not found');
        this.isLoading = false;
        return of(null);
      }))
      .subscribe(account => {
        if (account) {
          this.accountVerified = true;
          this.accountHolderName = account.accountHolderName;
          this.currentBalance = account.balance;
        }
        this.isLoading = false;
      });
  }

  onSubmit() {
    if (this.withdrawForm.valid && this.accountVerified) {
      const accountNumber = this.withdrawForm.get('accountNumber')?.value;
      const amount = parseFloat(this.withdrawForm.get('amount')?.value);

      if (amount > this.currentBalance) {
        alert('Withdrawal failed: Insufficient funds');
        return;
      }

      this.isLoading = true;

      const withdrawalData = {
        accountNumber: accountNumber,
        amount: amount
      };

      this.http.post('http://localhost:5100/api/Accounts/withdraw', withdrawalData, { responseType: 'text' })
        .pipe(catchError(err => {
          alert('Withdrawal failed');
          this.isLoading = false;
          return of(null);
        }))
        .subscribe(response => {
          if (response) {
            alert(response);
            this.withdrawForm.reset();
            this.accountVerified = false;
            this.accountHolderName = '';
            this.currentBalance = 0;
          }
          this.isLoading = false;
        });
    } else {
      alert('Please verify account and fill all fields correctly');
    }
  }
}
