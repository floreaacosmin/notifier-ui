import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';
import {Injectable} from '@angular/core';

import { Notification } from './../objects/notification';
import {BackendURL} from './backendurl';
import {NOTIFICATIONS} from '../objects/mock-notifications';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NotificationService {
  
  private headers = new Headers({'Content-Type': 'application/json'});
  private failedAttemptNumber: number;

  constructor(private http: Http) {
    this.failedAttemptNumber = 0;
  }

  getNotification(id: number): Promise<Notification> {
    const url = `${BackendURL.notificationUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Notification)
      .catch(this.handleError.bind(this));
  }

  getNotifications(): Promise<Notification[]> {
    return this.http.request(BackendURL.allNotificationsUrl)
      .toPromise()
      .then(response => response.json() as Notification[])
      .catch(this.handleError.bind(this));
  }

  updateNotification(notification: Notification): Promise<Notification> {
    const url = `${BackendURL.allNotificationsUrl}/${notification.id}`;
    return this.http
      .put(url, JSON.stringify(notification), {headers: this.headers})
      .toPromise()
      .then(() => notification)
      .catch(this.handleError.bind(this));
  }

  createNotification(author: string, name: string, content: string): Promise<Notification> {
    return this.http.post(BackendURL.sendNotificationUrl,
      JSON.stringify({author: author, name: name, content: content}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Notification)
      .catch(this.handleError.bind(this));
  }
  
  deleteNotification(id: number): Promise<void> {
    const url = `${BackendURL.notificationUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError.bind(this));
  }

  testConnection(): Observable<any> {
    return this.http.request(BackendURL.baseUrlOpenShift);
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
