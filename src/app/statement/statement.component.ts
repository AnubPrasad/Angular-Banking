// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-statement',
//   templateUrl: './statement.component.html',
//   styleUrls: ['./statement.component.css']
// })
// export class StatementComponent {

// }

import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction.model';
// import { TransactionService } from '../transaction.service';
import { TransactionService } from '../services/transaction.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})



export class StatementComponent implements OnInit {
  // transactions: Transaction[] = [];
  fromDate = '';
  toDate = '';
  loadDetailed = false;

  customerId: number | null = null;
userData: any;

  constructor(private transactionService: TransactionService,private http: HttpClient,  private authService: AuthService) {}

  ngOnInit(): void {}

// ngOnInit(): void {
//   this.userData = this.authService.getCustomerDetails();
  
//   if (this.userData?.username) {
//     this.http.get<any[]>('http://localhost:5100/api/customers')
//       .subscribe({
//         next: (customers) => {
//           const matchedCustomer = customers.find(c => c.name === this.userData.username);
//           if (matchedCustomer) {
//             this.customerId = matchedCustomer.customerID;

//             // Optionally pre-fill form with their info
//             this.profileForm.patchValue({
//               name: matchedCustomer.name,
//               email: matchedCustomer.email,
//               phone: matchedCustomer.phone,
//               password: matchedCustomer.password
//             });
//           }
//         },
//         error: (err) => {
//           console.error('Failed to fetch customers:', err);
//         }
//       });
//   }
// }

  loadMiniStatement() {
    this.loadDetailed = false;
    this.transactionService.getAllTransactions().subscribe(data => {
      this.transactions = data.slice(-10).reverse();
    });
  }

  // loadDetailedStatement() {
  //   if (this.fromDate && this.toDate) {
  //     this.transactionService.getTransactionsByDate(this.fromDate, this.toDate).subscribe(data => {
  //       this.transactions = data;
        
  //     });
  //   } else {
  //     alert('Please select both From and To dates');
  //   }
  // }
transactions: Transaction[] = [];

loadDetailedStatement() {
  if (this.fromDate && this.toDate) {
    this.transactionService.getTransactionsByDate(this.fromDate, this.toDate)
      .subscribe(data => {
        console.log('Detailed Statement:', data);
        this.transactions = data.transactions; // ✅ Extract transactions from object
      });
  } else {
    alert('Please select both From and To dates');
  }
}

}
