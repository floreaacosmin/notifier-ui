import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NotificationsComponent } from './../components/notifications/notifications.component';
import { NotificationDetailComponent } from './../components/notification-detail/notification-detail.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: NotificationDetailComponent },
  { path: 'notifications', component: NotificationsComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
  
export class AppRoutingModule {}
