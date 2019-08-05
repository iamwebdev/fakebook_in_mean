import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private toastrService: ToastrService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }


  ngOnInit() {
  }

  loginUser() {
    this.authService.signInUser(this.loginForm.value).subscribe(res => {
      if(res['status']) {
        this.authService.saveAuthDetails(res['token'], res['user'])
        this.toastrService.success(res['message'],'Successfully',{timeOut: 1000})
        setTimeout(() => {
          this.router.navigate(['/my-profile']);
        }, 1000)
      } else {
        this.toastrService.error(res['message'],'Oops',{timeOut: 1000})
      }
    })
  }
}
