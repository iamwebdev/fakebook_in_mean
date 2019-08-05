import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  friends:any = []
  chatMessages:any = []
  messageForm: FormGroup
  constructor(private authService: AuthService, private fb: FormBuilder,private toastrService: ToastrService) {
    this.messageForm = this.fb.group({
      reciever : ['',[Validators.required]],
      message : ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.authService.getConversation().subscribe(res => {
      if (res['status'])
        this.friends = res['data']
    })
  }

  loadConversation(id) {
    this.messageForm.get('reciever').setValue(id);
    this.authService.getAllMesssagesByUserId(id).subscribe(res => {
      if(res['status'])
        this.chatMessages = res['data']
    })
  }
  
  replyToMessage() {
    this.authService.sendMessageToFriend(this.messageForm.value).subscribe(res => {
      if (res['status']) {
        this.loadConversation(this.messageForm.value.reciever)
        this.messageForm.reset()
        this.toastrService.success(res['message'],'Successfully',{timeOut
        :1000})
      } else {  
        this.toastrService.error(res['message'],'Oops',{timeOut
          :1000})
      }
    })
  }
}
