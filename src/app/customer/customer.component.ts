// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-customer',
// //   templateUrl: './customer.component.html',
// //   styleUrls: ['./customer.component.css']
// // })
// // export class CustomerComponent {

// // }

// import { Component } from '@angular/core';
// // import { Person } from '../models/person.model';
// import { Person } from '../person.model';
// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css']
// })
// export class CustomerComponent {
//   customers: Person[] = [
//     {
//       name: 'Ravi Kumar',
//       email: 'ravi@example.com',
//       phone: '9876543210',
//       address: 'Delhi',
//       status: 'Active',
//       dateOfJoining: '2023-01-15'
//     },
//     {
//       name: 'Sneha Mehta',
//       email: 'sneha@example.com',
//       phone: '9123456780',
//       address: 'Mumbai',
//       status: 'Inactive',
//       dateOfJoining: '2022-05-21'
//     }
//   ];
// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// export interface Person {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   status: string;
//   dateOfJoining: string;
// }

// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css']
// })
// export class CustomerComponent implements OnInit {
//   customers: Person[] = [];
//   pageSize = 10;
//   currentPage = 1;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadCustomers();
//   }

//   loadCustomers() {
//     this.http.get<Person[]>('http://localhost:5001/api/customer-list').subscribe({
//       next: (data) => {
//         this.customers = data;
//       },
//       error: (err) => {
//         console.error('Error loading customers:', err);
//       }
//     });
//   }

//   get paginatedCustomers(): Person[] {
//     const start = (this.currentPage - 1) * this.pageSize;
//     return this.customers.slice(start, start + this.pageSize);
//   }

//   nextPage() {
//     if (this.currentPage * this.pageSize < this.customers.length) {
//       this.currentPage++;
//     }
//   }

//   prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// export interface Person {
//   customerID: number;
//   userID: number;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   password: string;
// }

// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css']
// })
// export class CustomerComponent implements OnInit {
//   customers: Person[] = [];
//   pageSize = 10;
//   currentPage = 1;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadCustomers();
//   }

//   loadCustomers() {
//     this.http.get<Person[]>('http://localhost:5001/api/customer-list').subscribe({
//       next: (data) => {
//         this.customers = data;
//       },
//       error: (err) => {
//         console.error('Error loading customers:', err);
//       }
//     });
//   }

//   get paginatedCustomers(): Person[] {
//     const start = (this.currentPage - 1) * this.pageSize;
//     return this.customers.slice(start, start + this.pageSize);
//   }

//   nextPage() {
//     if (this.currentPage * this.pageSize < this.customers.length) {
//       this.currentPage++;
//     }
//   }

//   prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Person {
  customerID: number;
  userID: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Person[] = [];
  pageSize = 10;
  currentPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.http.get<Person[]>('http://localhost:5100/api/Customers').subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        console.error('Error loading customers:', err);
      }
    });
  }

  get paginatedCustomers(): Person[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.customers.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.customers.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
