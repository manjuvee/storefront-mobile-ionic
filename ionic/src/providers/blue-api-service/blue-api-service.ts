import { Injectable } from '@angular/core';

/*
  Generated class for the BlueApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BlueApiServiceProvider {

  baseURL = "http://web-bluecompute.apps.mfstorefront.os.fyre.ibm.com/";

  constructor() {
    console.log('Hello BlueApiServiceProvider Provider');
  }
  getCatalog(successCallback, errorCallback) {
    var restUrl = this.baseURL + 'catalog/';
    var requestType = 'GET';
    this.invokeService(restUrl, requestType, null, successCallback, errorCallback);
  }
  
  getItemById(itemId, successCallback, errorCallback) {
    var restUrl = this.baseURL + 'catalog/' + itemId;
    var requestType = 'GET';
    this.invokeService(restUrl, requestType, null, successCallback, errorCallback);
  }

  getItemReviewById(itemId, successCallback, errorCallback) {
    var restUrl = this.baseURL + 'review/' + itemId;
    var requestType = 'GET';
    this.invokeService(restUrl, requestType, null, successCallback, errorCallback);
  }

  loginUser(parameters, successCallback, errorCallback) {
    //var restUrl = this.baseURL + CONFIG["Auth-Server"].protocol + '://' + CONFIG["Auth-Server"].host + '/oauth/token'
    var restUrl = this.baseURL + 'oauth/token'
    var requestType = 'POST';
    this.invokeService(restUrl, requestType, parameters, successCallback, errorCallback);
  }

  buyItems(access_token, parameters, successCallback, errorCallback) {
    var restUrl = this.baseURL + 'order/';
    var requestType = 'POST_AUTH';
    this.invokeService(restUrl, requestType, parameters, successCallback, errorCallback, access_token);
  }

  addReviewItem(access_token, itemId, parameters, successCallback, errorCallback) {
    var restUrl = this.baseURL + 'review/' + itemId;
    var requestType = 'POST_AUTH';
    this.invokeService(restUrl, requestType, parameters, successCallback, errorCallback, access_token);
  }

  getCustomerProfile(access_token, successCallback, errorCallback) {
    var restUrl = this.baseURL + 'customer/';
    var requestType = 'GET_AUTH';
    this.invokeService(restUrl, requestType, null, successCallback, errorCallback, access_token);
  }

  getCustomerOrders(access_token, successCallback, errorCallback) {
    var restUrl = this.baseURL + 'order/';
    var requestType = 'GET_AUTH';
    this.invokeService(restUrl, requestType, null, successCallback, errorCallback, access_token);
  }


  private invokeService(restUrl, requestType, parameters, successCallback, errorCallback, access_token?) {
    var resourceRequest: WLResourceRequest;
    if (requestType == 'GET') {
      resourceRequest = new WLResourceRequest(restUrl, WLResourceRequest.GET);
      resourceRequest.send().then(successCallback, errorCallback);
    }
    else if (requestType == 'GET_AUTH') {
      resourceRequest = new WLResourceRequest(restUrl, WLResourceRequest.GET);
      resourceRequest.addHeader("Authorization", 'Bearer ' + access_token);
      resourceRequest.send().then(successCallback, errorCallback);
    }
    else if (requestType == 'DELETE') {
      resourceRequest = new WLResourceRequest(restUrl, WLResourceRequest.DELETE);
      resourceRequest.send().then(successCallback, errorCallback);
    } else if (requestType == 'POST_AUTH') {
      resourceRequest = new WLResourceRequest(restUrl, WLResourceRequest.POST);
      resourceRequest.addHeader("Authorization", 'Bearer ' + access_token);
      resourceRequest.send().then(successCallback, errorCallback);
    }
    else {
      var basicAuthToken = "asdfdas"//CONFIG["Auth-Server"].client_id + ":" + CONFIG["Auth-Server"].client_secret;
      var authToken = "asdfads"//'Basic ' + $base64.encode(basicAuthToken);
      console.log("BasiAuth of " + basicAuthToken + " 64 encoded token: " + authToken);
      console.log("with Url parameter: " + JSON.stringify(parameters));
      resourceRequest = new WLResourceRequest(restUrl, WLResourceRequest.POST);
      resourceRequest.addHeader("Authorization", authToken);
      resourceRequest.sendFormParameters(parameters).then(successCallback, errorCallback);
    }
  }



}
