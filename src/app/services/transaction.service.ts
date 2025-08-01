// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TransactionService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../transaction.model';
import { AuthService } from './auth.service';
import { DetailedStatement } from '../models/DetailedStatement';


@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = 'http://localhost:5100/api/Transactions';

  constructor(private http: HttpClient,  private authService: AuthService ) {}

  // getAllTransactions(): Observable<Transaction[]> {
  //   return this.http.get<Transaction[]>(`${this.apiUrl}/mini-statement`);
  // }

  // getTransactionsByDate(from: string, to: string): Observable<Transaction[]> {
  //   return this.http.get<Transaction[]>(`${this.apiUrl}/detailed-statement?from=${from}&to=${to}`);
  // }
//   getAllTransactions(): Observable<Transaction[]> {

//     const username = this.authService.getCustomerDetails()?.username;

//   if (!username) throw new Error('User not logged in or missing token');

//   // First fetch the accountNumber from backend using username
//   return new Observable(observer => {
//     this.http.get<any[]>('http://localhost:5100/api/customers').subscribe({
//       next: (customers) => {
//         const matched = customers.find(c => c.name === username);
//         if (matched && matched.accountNumber) {
//           this.http.get<Transaction[]>(
//             `${this.apiUrl}/mini-statement?accountNumber=${matched.accountNumber}`
//           ).subscribe({
//             next: (transactions) => observer.next(transactions),
//             error: (err) => observer.error(err)
//           });
//         } else {
//           observer.error('No matching customer/account found.');
//         }
//       },
//       error: (err) => observer.error(err)
//     });
//   });
//   //   const accountNumber = this.authService.getCustomerDetails()?.accountNumber;
//   //   return this.http.get<Transaction[]>(`${this.apiUrl}/mini-statement?accountNumber=${accountNumber}`);
//   // }
// }

getAllTransactions(): Observable<Transaction[]> {
  const username = this.authService.getCustomerDetails()?.username;

  if (!username) {
    throw new Error('User not logged in or missing token');
  }

  return new Observable<Transaction[]>(observer => {
    // Step 1: Get all customers
    this.http.get<any[]>('http://localhost:5100/api/customers').subscribe({
      next: (customers) => {
        // Step 2: Find the customer with matching name
        const customer = customers.find(c => c.name.toLowerCase() === username.toLowerCase());
        console.log(username);
        console.log(customer);
        // console.log(matched.accountNumber);
        // console.log(matched);
        
        // if (matched && matched.accountNumber) {
        //   const accountNumber = matched.accountNumber;
        //   console.log(accountNumber);
        //   // Step 3: Use the correct Transactions API

        //   this.http.get<Transaction[]>(
        //     `http://localhost:5100/api/Transactions?accountNumber=${accountNumber}`
        //   ).subscribe({
        //     next: (transactions) => observer.next(transactions),
        //     error: (err) => observer.error(err)
        //   });
        // } else {
        //   observer.error('No matching customer/account found.');
        // }

        if (!customer) {
          observer.error('Customer not found');
          return;
        }

        const customerId = customer.customerID;
          console.log(customerId);
        // Step 2: Get all accounts and find one with customerID
        this.http.get<any[]>('http://localhost:5100/api/Accounts').subscribe({
          next: (accounts) => {
            const account = accounts.find(a => a.customerID === customerId);

            if (!account || !account.accountNumber) {
              observer.error('No account found for this customer');
              return;
            }

            const accountNumber = account.accountNumber;

            // Step 3: Get transactions
            this.http.get<Transaction[]>(
              `http://localhost:5100/api/Transactions?accountNumber=${accountNumber}`
            ).subscribe({
              next: (transactions) => observer.next(transactions),
              error: (err) => observer.error(err)
            });
          },
          error: (err) => observer.error(err)
        });
      },
      error: (err) => observer.error(err)
    });
  });
}

// getAllTransactions(): Observable<Transaction[]> {
//   const accountNumber = localStorage.getItem('accountNumber');

//   if (!accountNumber) {
//     throw new Error('Account number not found in local storage.');
//   }

//   return this.http.get<Transaction[]>(
//     `http://localhost:5100/api/Transactions?accountNumber=${accountNumber}`
//   );
// }



//   getTransactionsByDate(from: string, to: string): Observable<Transaction[]> {
//     // const accountNumber = this.authService.getCustomerDetails()?.accountNumber;
//     // return this.http.get<Transaction[]>(
//     //   `${this.apiUrl}/detailed-statement?accountNumber=${accountNumber}&from=${from}&to=${to}`
//     // );

//     const username = this.authService.getCustomerDetails()?.username;

//   if (!username) throw new Error('User not logged in or missing token');

//   return new Observable(observer => {
//     this.http.get<any[]>('http://localhost:5100/api/customers').subscribe({
//       next: (customers) => {
//         const matched = customers.find(c => c.name === username);
//         if (matched && matched.accountNumber) {
//           this.http.get<Transaction[]>(
//             `${this.apiUrl}/detailed-statement?accountNumber=${matched.accountNumber}&from=${from}&to=${to}`
//           ).subscribe({
//             next: (transactions) => observer.next(transactions),
//             error: (err) => observer.error(err)
//           });
//         } else {
//           observer.error('No matching customer/account found.');
//         }
//       },
//       error: (err) => observer.error(err)
//     });
//   });
//   }
// }



// getTransactionsByDate(from: string, to: string): Observable<Transaction[]> {
//   const username = this.authService.getCustomerDetails()?.username;

//   if (!username) throw new Error('User not logged in or missing token');

//   return new Observable<Transaction[]>(observer => {
//     // Step 1: Get all customers
//     this.http.get<any[]>('http://localhost:5100/api/customers').subscribe({
//       next: (customers) => {
//         const customer = customers.find(c => c.name.toLowerCase() === username.toLowerCase());

//         if (!customer) {
//           observer.error('Customer not found');
//           return;
//         }

//         const customerId = customer.customerID;

//         // Step 2: Get all accounts and match by customerID
//         this.http.get<any[]>('http://localhost:5100/api/Accounts').subscribe({
//           next: (accounts) => {
//             const account = accounts.find(a => a.customerID === customerId);

//             if (!account || !account.accountNumber) {
//               observer.error('No account found for this customer');
//               return;
//             }

//             const accountNumber = account.accountNumber;

//             // Step 3: Fetch transactions between the dates
//             this.http.get<Transaction[]>(
//               // `${this.apiUrl}/detailed-statement?accountNumber=${accountNumber}&from=${from}&to=${to}`
//               `http://localhost:5100/api/Transactions/detailed-statement/${accountNumber}?from=${from}&to=${to}`
//             ).subscribe({
//               next: (transactions) => observer.next(transactions),
//               error: (err) => observer.error(err)
//             });
//           },
//           error: (err) => observer.error(err)
//         });
//       },
//       error: (err) => observer.error(err)
//     });
//   });
// }


// getTransactionsByDate(from: string, to: string): Observable<Transaction[]> {
//   const username = this.authService.getCustomerDetails()?.username;

//   if (!username) throw new Error('User not logged in or missing token');

//   return new Observable(observer => {
//     this.http.get<any[]>('http://localhost:5100/api/customers').subscribe({
//       next: (customers) => {
//         const matched = customers.find(c => c.name.toLowerCase() === username.toLowerCase());

//         if (!matched) {
//           observer.error('No matching customer found.');
//           return;
//         }

//         const customerId = matched.customerID;

//         this.http.get<any[]>('http://localhost:5100/api/Accounts').subscribe({
//           next: (accounts) => {
//             const account = accounts.find(a => a.customerID === customerId);

//             if (!account || !account.accountNumber) {
//               observer.error('No account found for this customer');
//               return;
//             }

//             const accountNumber = account.accountNumber;

//             this.http.get<Transaction[]>(
//               `http://localhost:5100/api/Transactions/detailed-statement/${accountNumber}?from=${from}&to=${to}`
//             ).subscribe({
//               next: (transactions) => observer.next(transactions),
//               error: (err) => observer.error(err)
//             });
//           },
//           error: (err) => observer.error(err)
//         });
//       },
//       error: (err) => observer.error(err)
//     });
//   });
// }

getTransactionsByDate(from: string, to: string): Observable<DetailedStatement> {
  const username = this.authService.getCustomerDetails()?.username;

  if (!username) throw new Error('User not logged in or missing token');

  return new Observable<DetailedStatement>(observer => {
    this.http.get<any[]>('http://localhost:5100/api/customers').subscribe({
      next: (customers) => {
        const matched = customers.find(c => c.name.toLowerCase() === username.toLowerCase());

        if (!matched) {
          observer.error('No matching customer found.');
          return;
        }

        const customerId = matched.customerID;

        this.http.get<any[]>('http://localhost:5100/api/Accounts').subscribe({
          next: (accounts) => {
            const account = accounts.find(a => a.customerID === customerId);

            if (!account || !account.accountNumber) {
              observer.error('No account found for this customer');
              return;
            }

            const accountNumber = account.accountNumber;

            this.http.get<DetailedStatement>(
              `http://localhost:5100/api/Transactions/detailed-statement/${accountNumber}?from=${from}&to=${to}`
            ).subscribe({
              next: (data) => observer.next(data),
              error: (err) => observer.error(err)
            });
          },
          error: (err) => observer.error(err)
        });
      },
      error: (err) => observer.error(err)
    });
  });
}


// getTransactionsByDate(from: string, to: string): Observable<DetailedStatement> {
//   const accountNumber = localStorage.getItem('accountNumber');

//   if (!accountNumber) {
//     throw new Error('Account number not found in local storage.');
//   }

//   return this.http.get<DetailedStatement>(
//     `http://localhost:5100/api/Transactions/detailed-statement/${accountNumber}?from=${from}&to=${to}`
//   );
// }


}