import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { Notification } from './../../objects/notification';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  notifications: Notification[];
  selectedNotification: Notification;

  onSelect(notification: Notification): void {
    this.selectedNotification = notification;
  }

  getNotifications(): void {
    this.notificationservice.getNotifications().then(notifications => this.notifications = notifications);
  }

  addNotification(author: string, name: string, content: string): void {
    author = author.trim();
    name = name.trim();
    content = content.trim();
    
    if (!author || !name || !content) {
      return; 
    }

    this.notificationservice.createNotification(author, name, content)
      .then(notification => {
        this.notifications.push(notification);
        this.selectedNotification = null;
      });
  }

  deleteNotification(notification: Notification): void {
    this.notificationservice
      .deleteNotification(notification.id)
      .then(() => {
        this.notifications = this.notifications.filter(h => h !== notification);
        if (this.selectedNotification === notification) {this.selectedNotification = null; }
      });
  }

  // lifecycle hook to get the notification data when the AppComponent activates
  ngOnInit(): void {
    this.getNotifications();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedNotification.id]);
  }

  constructor(
    private router: Router,
    private notificationservice: NotificationService) {}

}
