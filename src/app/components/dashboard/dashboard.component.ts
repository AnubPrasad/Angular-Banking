// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent{
// //  username: string = 'Guest'; // Default value
//  username: string = 'Customer';
//   customerDetails: any = null;
  
//   constructor(private authService: AuthService) {}
  
//   // ngOnInit() {
//   //   // Get username from auth service or decoded token
//   //   const token = this.authService.getToken();
//   //   if (token) {
//   //     // Example - get username from decoded token
//   //     const decoded = this.authService.decodeToken(token);
//   //     this.username = decoded.name || 'Customer';
//   //   }
//   // }
//   ngOnInit() {
//     const details = this.authService.getCustomerDetails();
//     if (details) {
//       this.customerDetails = details;
//       console.log(details.name);
//       this.username = details.name || 'Customer';
//     }
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

// import { LoginService } from 'src/app/services/login.service';
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   username: string = 'Customer';
//   accountNumber: string = '';
//   accountType: string = '';
//   balance: number = 0;

//   constructor(private LoginService: LoginService) {}

//   ngOnInit() {
//     const details = this.LoginService.getCustomerDetails();
//     if (details) {
//       this.username = details.username || 'Customer';
//       this.accountNumber = details.accountNumber || '';
//       this.accountType = details.accountType || '';
//       this.balance = details.balance || 0;
//     }
//   }

// }



import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = 'User';

  constructor(private loginService: AuthService) {}

  ngOnInit() {
    const details = this.loginService.getCustomerDetails();
    if (details) {
      this.username = details.username || 'User';
    }
  }
}

