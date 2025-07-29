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
  getAllTransactions(): Observable<Transaction[]> {
    const accountNumber = this.authService.getCustomerDetails()?.accountNumber;
    return this.http.get<Transaction[]>(`${this.apiUrl}/mini-statement?accountNumber=${accountNumber}`);
  }

  getTransactionsByDate(from: string, to: string): Observable<Transaction[]> {
    const accountNumber = this.authService.getCustomerDetails()?.accountNumber;
    return this.http.get<Transaction[]>(
      `${this.apiUrl}/detailed-statement?accountNumber=${accountNumber}&from=${from}&to=${to}`
    );
  }
}
