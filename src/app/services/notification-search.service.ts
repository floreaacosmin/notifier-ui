import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Notification } from './../objects/notification';
import { BackendURL } from './backendurl';

@Injectable()
export class NotificationSearchService {

  constructor(private http: Http) {}

  searchNotification(term: string): Observable<Notification[]> {
    return this.http
      .get(`${BackendURL.notificationsSearchUrl}/${term}`)
      .map(response => response.json() as Notification[]);
  }

}
