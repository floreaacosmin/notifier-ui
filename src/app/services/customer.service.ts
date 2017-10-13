import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';
import {Injectable} from '@angular/core';

import {Customer} from '../customer/customer';
import {BackendURL} from './backendurl';
import {CUSTOMERS} from '../mock-data/mock-customers';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {
  
  private headers = new Headers({'Content-Type': 'application/json'});
  private failedAttemptNumber: number;

  constructor(private http: Http) {
    this.failedAttemptNumber = 0;
  }

  getCustomer(id: number): Promise<Customer> {
    const url = `${BackendURL.customersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Customer)
      .catch(this.handleError.bind(this));
  }

  getCustomers(): Promise<Customer[]> {
    return this.http.request(BackendURL.customersUrl + BackendURL.allSuffix)
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError.bind(this));
  }

  updateCustomer(customer: Customer): Promise<Customer> {
    const url = `${BackendURL.customersUrl}/${customer.id}`;
    return this.http
      .put(url, JSON.stringify(customer), {headers: this.headers})
      .toPromise()
      .then(() => customer)
      .catch(this.handleError.bind(this));
  }

  createCustomer(firstName: string, lastName: string): Promise<Customer> {
    return this.http.post(BackendURL.addCustomerUrl,
      JSON.stringify({firstName: firstName, lastName: lastName}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Customer)
      .catch(this.handleError.bind(this));
  }
  
  deleteCustomer(id: number): Promise<void> {
    const url = `${BackendURL.customersUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError.bind(this));
  }

  testConnection(): Observable<any> {
    return this.http.request(BackendURL.baseUrl);
  }

  private handleError(error: Response): Promise<any> {
    this.failedAttemptNumber++;
    console.log(this.failedAttemptNumber + ' http request failed');
    return Promise.reject(error);
  }

  /*
  getCustomersMock(): Promise<Customer[]> {
    return Promise.resolve(CUSTOMERS);
  }
  */

  /*
  getCustomersSlowly(): Promise<Customer[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getCustomers()), 2000);
    });
  }
  */
}
