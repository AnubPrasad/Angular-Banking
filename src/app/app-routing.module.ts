import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

// Import all components from the components directory
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { SearchAccountComponent } from './components/search-account/search-account.component';
import { ViewTransactionComponent } from './components/view-transaction/view-transaction.component';
import { ViewBalanceComponent } from './components/view-balance/view-balance.component';
import { DepositMoneyComponent } from './components/deposit-money/deposit-money.component';
import { WithdrawMoneyComponent } from './components/withdraw-money/withdraw-money.component';
import { SignupComponent } from './signup/signup.component';
import { RoleGuard } from './role.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';
import { StatementComponent } from './statement/statement.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { CustomerComponent } from './customer/customer.component';
import { AccountComponent } from './account/account.component';
import { EmployeeComponent } from './employee/employee.component';
// import { HomeComponent } from './home/home.component';

// const routes: Routes = [
//   { path: 'signup', component: SignupComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: 'manage-account', component: ManageAccountComponent, canActivate: [AuthGuard] },
//   { path: 'search-account', component: SearchAccountComponent, canActivate: [AuthGuard] },
//   { path: 'view-transaction', component: ViewTransactionComponent, canActivate: [AuthGuard] },
//   { path: 'view-balance', component: ViewBalanceComponent, canActivate: [AuthGuard] },
//   { path: 'deposit-money', component: DepositMoneyComponent, canActivate: [AuthGuard] },
//   { path: 'withdraw-money', component: WithdrawMoneyComponent, canActivate: [AuthGuard]},
//   { path: '', redirectTo: '/signup', pathMatch: 'full' },
//   { path: '**', redirectTo: '/signup' }
// ];


// const routes: Routes = [
//   { path: 'signup', component: SignupComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

//   // Only Admin
//   { path: 'manage-account', component: ManageAccountComponent, canActivate: [AuthGuard,RoleGuard], data: { expectedRole: 'Admin' } },
//   { path: 'search-account', component: SearchAccountComponent, canActivate: [AuthGuard], data: { expectedRole: 'Admin' } },

//   // Only User
//   { path: 'view-balance', component: ViewBalanceComponent, canActivate: [AuthGuard], data: { expectedRole: 'User' } },
//   { path: 'deposit-money', component: DepositMoneyComponent, canActivate: [AuthGuard,RoleGuard], data: { expectedRole: 'User' } },
//   { path: 'withdraw-money', component: WithdrawMoneyComponent, canActivate: [AuthGuard], data: { expectedRole: 'User' } },

//   // Common or fallback
//   { path: 'view-transaction', component: ViewTransactionComponent, canActivate: [AuthGuard] },

//   { path: '', redirectTo: '/signup', pathMatch: 'full' },
//   { path: '**', redirectTo: '/signup' }
// ];



// const routes: Routes = [
//   { path: 'signup', component: SignupComponent },
//   { path: 'login', component: LoginComponent, },
  
//   // Main dashboard route with sidebar
//   { 
//     path: '', component: HomeComponent,canActivate: [AuthGuard],
//     children: [
//       { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]}, // For the dashboard content
//       { path: 'manage-account', component: ManageAccountComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
//       { path: 'search-account', component: SearchAccountComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
//       { path: 'view-balance', component: ViewBalanceComponent, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
//       { path: 'deposit-money', component: DepositMoneyComponent, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
//       { path: 'withdraw-money', component: WithdrawMoneyComponent, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
//       { path: 'view-transaction', component: ViewTransactionComponent , canActivate: [AuthGuard]}
//     ]
//   },
  
//   // Default routes
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: '**', redirectTo: '/login' }
// ];


const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  {path: 'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  // { path: 'emi-calculator', component: EmiCalculatorComponent },
  { path: 'statement', component: StatementComponent, canActivate: [AuthGuard] },
   { path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
   { path: 'create-account', component: CreateAccountComponent },
   { path: 'fund-transfer', component: FundTransferComponent },
   { path: 'apply-loan', component: ApplyLoanComponent },
   { path: 'app-withdraw-money', component:WithdrawMoneyComponent},
   { path: 'app-deposit-money', component: DepositMoneyComponent},
   { path: 'app-add-beneficiary', component: AddBeneficiaryComponent },
   { path: 'pending-request', component: PendingRequestComponent },
   { path: 'app-customer', component: CustomerComponent },
{ path: 'app-account', component: AccountComponent },
{ path: 'employee', component:EmployeeComponent },


  
  // Protected routes (require authentication)
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  
  // Admin-only routes
  // { 
  //   path: 'manage-account', 
  //   component: ManageAccountComponent, 
  //   canActivate: [AuthGuard, RoleGuard], 
  //   data: { expectedRole: 'Admin' } 
  // },
  // { 
  //   path: 'search-account', 
  //   component: SearchAccountComponent, 
  //   canActivate: [AuthGuard, RoleGuard], 
  //   data: { expectedRole: 'Admin' } 
  // },
  
  // // User-only routes
  // { 
  //   path: 'view-balance', 
  //   component: ViewBalanceComponent, 
  //   canActivate: [AuthGuard, RoleGuard], 
  //   data: { expectedRole: 'User' } 
  // },
  // { 
  //   path: 'deposit-money', 
  //   component: DepositMoneyComponent, 
  //   canActivate: [AuthGuard, RoleGuard], 
  //   data: { expectedRole: 'User' } 
  // },
  // { 
  //   path: 'withdraw-money', 
  //   component: WithdrawMoneyComponent, 
  //   canActivate: [AuthGuard, RoleGuard], 
  //   data: { expectedRole: 'User' } 
  // },
  
  // // Common protected route
  // { 
  //   path: 'view-transaction', 
  //   component: ViewTransactionComponent, 
  //   canActivate: [AuthGuard] 
  // },
  
  // Redirect rules
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to login
  { path: '**', redirectTo: '/dashboard' } // Fallback to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




// const routes: Routes = [
//   // Public routes (no sidebar)
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
  
//   // Empty path ALWAYS redirects to login
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
  
//   // Main layout with sidebar (HomeComponent)
//   { 
//     path: 'home',  // Changed from '' to 'home'
//     component: HomeComponent,
//     canActivate: [AuthGuard],
//     children: [
//       // All these routes will show inside HomeComponent's <router-outlet>
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'manage-account', component: ManageAccountComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
//       { path: 'search-account', component: SearchAccountComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
//       { path: 'view-transaction', component: ViewTransactionComponent },
//       { path: 'view-balance', component: ViewBalanceComponent, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
//       { path: 'deposit-money', component: DepositMoneyComponent, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
//       { path: 'withdraw-money', component: WithdrawMoneyComponent, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
      
//       // Default route when accessing /home
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
//     ]
//   },
  
//   // Fallback routes
//   { path: '**', redirectTo: '/login' }
// ];