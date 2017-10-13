import {Component, OnInit} from '@angular/core';

import {Customer} from '../customer/customer';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers()
      .then(customers => this.customers = customers.slice(1, 5));
  }
}

