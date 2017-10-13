import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Customer} from '../customer/customer';
import { BackendURL } from './backendurl';

@Injectable()
export class CustomerSearchService {



  constructor(private http: Http) {}

  searchCustomer(term: string): Observable<Customer[]> {
    return this.http
      .get(`${BackendURL.customersSearchUrl}/${term}`)
      .map(response => response.json() as Customer[]);
  }

}
