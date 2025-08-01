// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-beneficiary',
//   templateUrl: './add-beneficiary.component.html',
//   styleUrls: ['./add-beneficiary.component.css']
// })
// export class AddBeneficiaryComponent {

// }



import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent {
  showAdd = false;
  showDetails = false;
  successMessage = '';
  errorMessage = '';

  beneficiary = {
    accountNumber: '',
    customerId: ''
  };

  verifiedBeneficiary: any = null;

  constructor(private http: HttpClient,private router: Router) {}

  onAddClick() {
    this.showAdd = true;
    this.showDetails = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onShowClick() {
    this.showAdd = false;
    this.showDetails = true;

    this.verifiedBeneficiary = {
      status: 'Active',
      accountNumber: '1234567890',
      customerName: 'John Doe'
    };
  }

  submitBeneficiary() {
    const { accountNumber, customerId } = this.beneficiary;

    const body = {
      beneficiaryID: 0,  // backend usually ignores ID on insert
      customerID: parseInt(customerId),
      beneficiaryAccountNumber: accountNumber
    };
// need to add the this.localstorage.customerid!=customerid in the below method

    this.http.post('http://localhost:5100/api/Beneficiaries', body)
      .subscribe({
        next: (res) => {
          this.successMessage = 'Beneficiary added successfully!';
          this.errorMessage = '';
          this.beneficiary = { accountNumber: '', customerId: '' };
        },
        error: (err) => {
          this.errorMessage = 'Failed to add beneficiary.';
          this.successMessage = '';
          console.error(err);
        }
      });

    // Clear messages after 3 seconds
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

  transferToBeneficiary() {
    this.router.navigate(['/fund-transfer']);
  }
}
