import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Notification } from './../../objects/notification';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: [ './notification-detail.component.css' ]
})

export class NotificationDetailComponent implements OnInit {

  notification: Notification;

  save(): void {
  this.notificationService.updateNotification(this.notification)
    .then(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.notificationService.getNotification(+params.get('id')))
      .subscribe(notification => this.notification = notification);
  }

  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
}
