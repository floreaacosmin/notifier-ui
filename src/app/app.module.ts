
import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';

import { NotificationService } from './services/notification.service';
import { NotificationSearchComponent } from './components/notification-search/notification-search.component';
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {DashboardComponent} from './/components/dashboard/dashboard.component';
import {AppStatusComponent} from './components/app-status/app-status.component'

import { AppRoutingModule } from './app-routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotificationsComponent,
    NotificationDetailComponent,
    NotificationSearchComponent,
    AppStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})

export class AppModule {}
