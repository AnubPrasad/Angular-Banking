// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-account',
//   templateUrl: './account.component.html',
//   styleUrls: ['./account.component.css']
// })
// export class AccountComponent {

// }



// import { Component } from '@angular/core';
// // import { Person } from '../models/person.model';
// import { Person } from '../person.model';

// @Component({
//   selector: 'app-account',
//   templateUrl: './account.component.html',
//   styleUrls: ['./account.component.css']
// })
// export class AccountComponent {
//   accounts: Person[] = [
//     {
//       name: 'Amit Verma',
//       email: 'amit@bank.com',
//       phone: '9988776655',
//       address: 'Chennai',
//       status: 'Active',
//       dateOfJoining: '2024-08-01'
//     }
//   ];
// }



import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Person {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  dateOfJoining: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Person[] = [];
  pageSize = 10;
  currentPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.http.get<Person[]>('http://localhost:5001/api/account-list').subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.error('Error loading accounts:', err);
      }
    });
  }

  get paginatedAccounts(): Person[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.accounts.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.accounts.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}

