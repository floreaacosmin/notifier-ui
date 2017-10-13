import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {Customer} from '../customer/customer';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: [ './customer-detail.component.css' ]
})

export class CustomerDetailComponent implements OnInit {

  customer: Customer;

  save(): void {
  this.customerService.updateCustomer(this.customer)
    .then(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.customerService.getCustomer(+params.get('id')))
      .subscribe(customer => this.customer = customer);
  }

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


}
