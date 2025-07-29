// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css']
// })
// export class EmployeeComponent {

// }


// import { Component } from '@angular/core';
// // import { Person } from '../models/person.model';
// import { Person } from '../person.model';
// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css']
// })
// export class EmployeeComponent {
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

// export interface Employee {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   status: string;
//   dateOfJoining: string;
// }

// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css']
// })
// export class EmployeeComponent implements OnInit {
//   employees: Employee[] = [];
//   pageSize = 10;
//   currentPage = 1;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadEmployees();
//   }

//   loadEmployees() {
//     this.http.get<Employee[]>('http://localhost:5001/api/employee-list').subscribe({
//       next: (data) => {
//         this.employees = data;
//       },
//       error: (err) => {
//         console.error('Error loading employee list:', err);
//       }
//     });
//   }

//   get paginatedEmployees(): Employee[] {
//     const start = (this.currentPage - 1) * this.pageSize;
//     return this.employees.slice(start, start + this.pageSize);
//   }

//   nextPage() {
//     if (this.currentPage * this.pageSize < this.employees.length) {
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

export interface Employee {
  employeeID: number;
  userID: number;
  name: string;
  designation: string;
  password: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  pageSize = 10;
  currentPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.http.get<Employee[]>('http://localhost:5100/api/Employees').subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error loading employee list:', err);
      }
    });
  }

  get paginatedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.employees.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
