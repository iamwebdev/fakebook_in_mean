import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recieved-request',
  templateUrl: './recieved-request.component.html',
  styleUrls: ['./recieved-request.component.css']
})
export class RecievedRequestComponent implements OnInit {

  list:any = []
  constructor(private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.authService.getRecievedFriendRequestList().subscribe(res => {
      if (res['status'])  
        this.list = res['data']
    })
  }

  actionOnRequest(action,senderId) {
    this.authService.actionOnRecievedRequest(action, senderId).subscribe(res => {
      if (res['status']) {
        this.toastrService.success(res['message'],'Successfully',{timeOut
        :1000})
        this.ngOnInit()
      } else {  
        this.toastrService.error(res['message'],'Oops',{timeOut
          :1000})
      }
    })
  }

}
