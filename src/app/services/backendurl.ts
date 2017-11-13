export class BackendURL {

  public static baseUrlLocal = 'http://localhost:8080';
  public static baseUrlOpenShift = 'http://notifier-rest-notifier-db.7e14.starter-us-west-2.openshiftapps.com';
  
  public static activeUrl = BackendURL.baseUrlOpenShift;

  public static allSuffix = '/all';

  public static notificationUrl = BackendURL.activeUrl + '/notifications';
  public static allNotificationsUrl = BackendURL.notificationUrl + BackendURL.allSuffix;

  public static notificationsSearchUrl = BackendURL.notificationUrl + '/search';  
  public static addNotificationUrl = BackendURL.activeUrl + '/addnotification';
  
}
