import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  readonly baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  deleteSentRequest(id) {
    return this.http.get(this.baseUrl+'/delete-request/'+id)
  }
}
