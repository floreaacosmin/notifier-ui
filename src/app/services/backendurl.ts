export class BackendURL {

  public static baseUrl = 'http://localhost:8080';
  public static customersUrl = BackendURL.baseUrl + '/customers';
  public static customersSearchUrl = BackendURL.customersUrl + '/search';  
  public static addCustomerUrl = BackendURL.baseUrl + '/addcustomer';
  public static allSuffix = '/all';
}
