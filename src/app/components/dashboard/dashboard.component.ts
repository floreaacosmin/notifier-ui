import {Component, OnInit} from '@angular/core';

import { Notification } from './../../objects/notification';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  notifications: Notification[] = [];
  
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications()
      .then(notifications => this.notifications = notifications.slice(notifications.length - 5, notifications.length));
  }
}

