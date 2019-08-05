import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseURL = 'http://localhost:3000'
  authtoken;
  authUser;
  headerParams;
  headers;

  constructor(private http: HttpClient) { }

  // Register User
  saveUser(formValues) {
    return this.http.post(this.baseURL+'/register', formValues)
  }

  //Attempts to Login In
  signInUser(formValues) {
    return this.http.post(this.baseURL+'/signin', formValues)
  }

  // Save Auth Details
  saveAuthDetails(token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user',JSON.stringify(user))
    this.authtoken = token;
    this.authUser = user; 
  }

  // Creating Headers for JWT
  createAuthHeader() {
    this.authtoken = localStorage.getItem('token') || [];
    this.headerParams = new HttpHeaders({
      'Content-Type' : 'application/json',
      'authorization' : this.authtoken     
    })
    this.headers = {
      headers: this.headerParams
    }
  }

  //Logout User
  logout() {
    this.authtoken = null;
    this.authUser = null;
    localStorage.clear();
  }

  // Get Profile
  getLoggedInUserProfile() {
    this.createAuthHeader();
    return this.http.get(this.baseURL+'/get-profile',this.headers);
  }

  // Get Friend Suggestion
  getFriendSuggestion() {
    this.createAuthHeader();
    return this.http.get(this.baseURL+'/get-suggestions', this.headers);
  }

  //Add Friend

  sendFriendRequest(formData) {
    this.createAuthHeader();
    return this.http.post(this.baseURL+'/send-friend-request',formData,this.headers)
  }

  getSentFriendRequestList() {
    this.createAuthHeader();
    return this.http.get(this.baseURL+'/sent-request-list',this.headers)
  }

  getRecievedFriendRequestList() {
    this.createAuthHeader();
    return this.http.get(this.baseURL+'/recieved-request-list',this.headers)
  }

  getFriendList() {
    this.createAuthHeader();
    return this.http.get(this.baseURL+'/friend-list',this.headers)
  }

  actionOnRecievedRequest(action, senderId) {
    this.createAuthHeader();
    return this.http.get(this.baseURL+'/action-on-request/'+action+'/'+senderId,this.headers)
  }

  sendMessageToFriend(formValues) {
    this.createAuthHeader();
    return this.http.post(this.baseURL+'/send-message', formValues, this.headers)
  }

  getConversation() {
    this.createAuthHeader()
    return this.http.get(this.baseURL+'/get-conversation', this.headers)
  }

  getAllMesssagesByUserId(userId) {
    this.createAuthHeader();
    return this.http.get(this.baseURL+'/get-messages/'+userId, this.headers)
  }

  saveUserPost(formData) {
    this.createAuthHeader();
    return this.http.post(this.baseURL+'/share-post', formData, this.headers)
  }

  getUserPosts(){
    this.createAuthHeader();
    return this.http.get(this.baseURL+'/get-posts', this.headers) 
  }
}
