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

import { NotificationSearchService } from './../../services/notification-search.service';
import { Notification } from './../../objects/notification';

@Component({
  selector: 'notification-search',
  templateUrl: './notification-search.component.html',
  styleUrls: ['./notification-search.component.css'],
  providers: [NotificationSearchService]
})
  
export class NotificationSearchComponent implements OnInit {
  
  notifications: Observable<Notification[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private notficationSearchService: NotificationSearchService,
    private router: Router) {}

  // push a search term into the observable stream
  searchNotification(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.notifications = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.notficationSearchService.searchNotification(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Notification[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Notification[]>([]);
      });
  }

  gotoDetail(notification: Notification): void {
    const link = ['/detail', notification.id];
    this.router.navigate(link);
  }
}
