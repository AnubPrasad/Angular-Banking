// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-beneficiary',
//   templateUrl: './add-beneficiary.component.html',
//   styleUrls: ['./add-beneficiary.component.css']
// })
// export class AddBeneficiaryComponent {

// }


import { Component } from '@angular/core';

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

  onAddClick() {
    this.showAdd = true;
    this.showDetails = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onShowClick() {
    this.showAdd = false;
    this.showDetails = true;

    // Simulate beneficiary details
    this.verifiedBeneficiary = {
      status: 'Active',
      accountNumber: '1234567890',
      customerName: 'John Doe'
    };
  }

  submitBeneficiary() {
    const { accountNumber, customerId } = this.beneficiary;

    // Simulate validation
    if (accountNumber === '1234567890' && customerId === 'CUST001') {
      this.successMessage = 'Beneficiary added successfully!';
      this.errorMessage = '';
    } else {
      this.successMessage = '';
      this.errorMessage = 'Invalid account number or customer ID.';
    }

    // Clear form fields after 3 sec
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

  transferToBeneficiary() {
    alert('Initiating transfer...');
  }
}
