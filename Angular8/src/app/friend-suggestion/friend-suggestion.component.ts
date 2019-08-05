import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-friend-suggestion',
  templateUrl: './friend-suggestion.component.html',
  styleUrls: ['./friend-suggestion.component.css']
})
export class FriendSuggestionComponent implements OnInit {

  suggestions:any = []
  constructor(private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.authService.getFriendSuggestion().subscribe(res => {
      if (res['status']) {
        this.suggestions = res['data']
      }
    })
  }

  addFriend(recieverId) {
    var formData = {
      rec_id : recieverId
    };
    this.authService.sendFriendRequest(formData).subscribe(res => {
      if (res['status']) {
        this.ngOnInit()
        this.toastrService.success(res['message'],'Successfully',{timeOut: 1000})
      } else {
        this.toastrService.error(res['message'],'Oops',{timeOut: 1000})
      }
    })
  }
}
