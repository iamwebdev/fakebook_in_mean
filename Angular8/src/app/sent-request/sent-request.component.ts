import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FriendService } from '../friend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sent-request',
  templateUrl: './sent-request.component.html',
  styleUrls: ['./sent-request.component.css']
})
export class SentRequestComponent implements OnInit {
  sentFriendList:any = []
  constructor(private authService: AuthService,private friendService: FriendService, private tostrService: ToastrService) { }

  ngOnInit() {
    this.authService.getSentFriendRequestList().subscribe(res => {
      if (res['status']) {
        this.sentFriendList = res['data']
          console.log(this.sentFriendList)
      }
    })
  }

  removeSentRequest(id) {
    this.friendService.deleteSentRequest(id).subscribe(res => {
      if(res['status']) { 
        this.tostrService.success(res['message'],'Successfully',{timeOut:1000})
        this.ngOnInit()
      } else {
        this.tostrService.error(res['message'],'Oops',{timeOut:1000})
      }
    })
  }

}
