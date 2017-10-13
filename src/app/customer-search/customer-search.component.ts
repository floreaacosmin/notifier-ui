import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {CustomerSearchService} from '../services/customer-search.service';
import {Customer} from '../customer/customer';

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
  providers: [CustomerSearchService]
})
  
export class CustomerSearchComponent implements OnInit {
  
  customers: Observable<Customer[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private customerSearchService: CustomerSearchService,
    private router: Router) {}

  // push a search term into the observable stream
  searchCustomer(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.customers = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.customerSearchService.searchCustomer(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Customer[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Customer[]>([]);
      });
  }

  gotoDetail(customer: Customer): void {
    const link = ['/detail', customer.id];
    this.router.navigate(link);
  }
}
