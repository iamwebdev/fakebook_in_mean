import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authDetails:any = []
  myPosts:any = []
  postForm: FormGroup
  
  constructor(private router: Router, private toastrService: ToastrService, private authService: AuthService, private fb: FormBuilder) { 
    this.postForm = this.fb.group({
      post: ['',Validators.required]
    })
  }

  ngOnInit() {
    this.authService.getLoggedInUserProfile().subscribe(res => {
      if(res['status']) {
        this.authDetails = res['user']
        this.authService.getUserPosts().subscribe(res2 => {
          if(res2['status']) {
            this.myPosts = res2['data']
          }
        })
      } else {
        this.toastrService.error('Redirecting to login','Invalid User',{timeOut:1000});
        setTimeout(() => {
          this.router.navigate['/'];
        },1000);
      }
    })
  }

  sharePost() {
    this.authService.saveUserPost(this.postForm.value).subscribe(res => {
      if(res['status']) {
        this.postForm.reset();
        this.ngOnInit()
        this.toastrService.success('Successfully', res['message'],{timeOut:1000});
      } else {
        this.toastrService.error('Oops',res['message'],{timeOut:1000});
      }
    })
  }

  logMeOut() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
