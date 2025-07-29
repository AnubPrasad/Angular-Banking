// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pending-request',
//   templateUrl: './pending-request.component.html',
//   styleUrls: ['./pending-request.component.css']
// })
// export class PendingRequestComponent {

// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pending-request',
//   templateUrl: './pending-request.component.html',
//   styleUrls: ['./pending-request.component.css']
// })
// export class PendingRequestComponent {
//   showLoanRequests = false;
//   showSavingRequests = false;

//   loanRequests = [
//     {
//       customerName: 'Ravi Kumar',
//       amount: 100000,
//       duration: '12 months',
//       interestRate: '10%',
//       fromDate: '2025-07-01',
//       status: 'Pending'
//     },
//     {
//       customerName: 'Sneha Patel',
//       amount: 50000,
//       duration: '6 months',
//       interestRate: '8%',
//       fromDate: '2025-07-10',
//       status: 'Pending'
//     }
//   ];

//   handleApprove(index: number) {
//     this.loanRequests[index].status = 'Approved';
//   }

//   handleReject(index: number) {
//     this.loanRequests[index].status = 'Rejected';
//   }

//   showLoan() {
//     this.showLoanRequests = true;
//     this.showSavingRequests = false;
//   }

//   showSaving() {
//     this.showLoanRequests = false;
//     this.showSavingRequests = true;

//     // You can also populate savingRequests if needed
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-pending-request',
//   templateUrl: './pending-request.component.html',
//   styleUrls: ['./pending-request.component.css']
// })
// export class PendingRequestComponent implements OnInit {
//   showLoanRequests = false;
//   showSavingRequests = false;

//   loanRequests: any[] = [];
//   savingRequests: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {}

//   showLoan() {
//     this.showLoanRequests = true;
//     this.showSavingRequests = false;
//     this.http.get<any[]>('http://localhost:5001/api/loan-account').subscribe(data => {
//       this.loanRequests = data;
//     });
//   }

//   showSaving() {
//     this.showLoanRequests = false;
//     this.showSavingRequests = true;
//     this.http.get<any[]>('http://localhost:5001/api/saving-account').subscribe(data => {
//       this.savingRequests = data;
//     });
//   }

//   handleApprove(index: number) {
//     this.loanRequests[index].status = 'Approved';
//   }

//   handleReject(index: number) {
//     this.loanRequests[index].status = 'Rejected';
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {
  showLoanRequests = false;
  showSavingRequests = false;

  loanRequests: any[] = [];
  savingRequests: any[] = [];

  // Pagination variables
  pageSize = 10;
  loanPage = 1;
  savingPage = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  showLoan() {
    this.showLoanRequests = true;
    this.showSavingRequests = false;
    this.loanPage = 1;

    this.http.get<any[]>('http://localhost:5001/api/loan-account').subscribe(data => {
      this.loanRequests = data;
    });
  }

  showSaving() {
    this.showLoanRequests = false;
    this.showSavingRequests = true;
    this.savingPage = 1;

    this.http.get<any[]>('http://localhost:5001/api/saving-account').subscribe(data => {
      this.savingRequests = data;
    });
  }

  handleApprove(index: number) {
    const globalIndex = (this.loanPage - 1) * this.pageSize + index;
    this.loanRequests[globalIndex].status = 'Approved';
  }

  handleReject(index: number) {
    const globalIndex = (this.loanPage - 1) * this.pageSize + index;
    this.loanRequests[globalIndex].status = 'Rejected';
  }

  // Pagination helpers
  getPaginatedLoans(): any[] {
    const start = (this.loanPage - 1) * this.pageSize;
    return this.loanRequests.slice(start, start + this.pageSize);
  }

  getPaginatedSavings(): any[] {
    const start = (this.savingPage - 1) * this.pageSize;
    return this.savingRequests.slice(start, start + this.pageSize);
  }

  nextLoanPage() {
    if (this.loanPage * this.pageSize < this.loanRequests.length) {
      this.loanPage++;
    }
  }

  prevLoanPage() {
    if (this.loanPage > 1) {
      this.loanPage--;
    }
  }

  nextSavingPage() {
    if (this.savingPage * this.pageSize < this.savingRequests.length) {
      this.savingPage++;
    }
  }

  prevSavingPage() {
    if (this.savingPage > 1) {
      this.savingPage--;
    }
  }
}
