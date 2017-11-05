export class BackendURL {

  // public static baseUrlLocal = 'http://localhost:8080';
  public static baseUrlOpenShift = 'http://notifier-rest-notifier-db.7e14.starter-us-west-2.openshiftapps.com';
  public static allNotificationsUrl = BackendURL.baseUrlOpenShift + '/notifications/all';
  public static notificationUrl = BackendURL.baseUrlOpenShift + '/notifications/';

  public static notificationsSearchUrl = BackendURL.allNotificationsUrl + '/search';  
  public static addNotificationUrl = BackendURL.baseUrlOpenShift + '/addnotification';
  public static allSuffix = '/all';
}
