import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {CustomersComponent} from './customers/customers.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CustomerSearchComponent} from './customer-search/customer-search.component';
import {CustomerService} from './services/customer.service';
import {AppStatusComponent} from './app-status/app-status.component'

import { AppRoutingModule } from './app-routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomersComponent,
    CustomerDetailComponent,
    CustomerSearchComponent,
    AppStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})

export class AppModule {}
