import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Customer} from '../customer/customer';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {

  customers: Customer[];
  selectedCustomer: Customer;

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  getCustomers(): void {
    this.customerService.getCustomers().then(customers => this.customers = customers);
  }

  addCustomer(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (!firstName || !lastName) {return; }
    this.customerService.createCustomer(firstName, lastName)
      .then(customer => {
        this.customers.push(customer);
        this.selectedCustomer = null;
      });
  }

  deleteCustomer(customer: Customer): void {
    this.customerService
      .deleteCustomer(customer.id)
      .then(() => {
        this.customers = this.customers.filter(h => h !== customer);
        if (this.selectedCustomer === customer) {this.selectedCustomer = null; }
      });
  }

  // lifecycle hook to get the customer data when the AppComponent activates
  ngOnInit(): void {
    this.getCustomers();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCustomer.id]);
  }

  constructor(
    private router: Router,
    private customerService: CustomerService) {}

}
