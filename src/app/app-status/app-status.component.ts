import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationStart} from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import {CustomerService} from '../services/customer.service';


@Component({
  selector: 'app-status',
  templateUrl: 'app-status.component.html',
  styleUrls: ['./app-status.component.css']
})
  
export class AppStatusComponent implements OnInit, OnDestroy {

  public backendStatus: String;
  private routerSubscription: Subscription;
  private observableSubscription: Subscription;

  constructor(private customerService: CustomerService, private router: Router) {}

  private setBackendStatus(status: string) {
    console.log('setBackendStatus() value: ' + status);
      this.backendStatus = status;
  }

  ngOnInit(): void {
   
    this.routerSubscription = this.router.events.subscribe(
      (event) => {if (event instanceof NavigationStart) {
        this.observableSubscription = this.customerService.testConnection().subscribe(
          value => this.setBackendStatus(''),
          error => this.setBackendStatus('backend is down'),
          () => {} // do nothing on complete
        )
      }}
    )
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.observableSubscription.unsubscribe();
  }
}
