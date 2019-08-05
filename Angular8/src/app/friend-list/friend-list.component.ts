import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  list:any = []

  messageForm : FormGroup

  constructor(private authService:AuthService, private fb: FormBuilder, private toastrService: ToastrService) {
    this.messageForm = this.fb.group({
      reciever : ['',[Validators.required]],
      message : ['', [Validators.required]]
    })
   }

  ngOnInit() {
    this.authService.getFriendList().subscribe(res => {
      if (res['status'])  
        this.list = res['data']
    })
  }

  setFormValues(reciever_id) {
    this.messageForm.get('reciever').setValue(reciever_id);
  }

  sendMesage() {
    this.authService.sendMessageToFriend(this.messageForm.value).subscribe(res => {
      if (res['status']) {
        this.messageForm.reset()
        $(function () {
          $('#login-modal').modal('toggle');
        });
        this.toastrService.success(res['message'],'Successfully',{timeOut
        :1000})
      } else {  
        this.toastrService.error(res['message'],'Oops',{timeOut
          :1000})
      }
    })
  }
}
