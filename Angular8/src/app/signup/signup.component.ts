import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup
  constructor(private fb: FormBuilder, private authServive: AuthService, private toastr: ToastrService) { 
    this.userForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirm_password: ['',Validators.required]
    })
  }

  ngOnInit() {
  }
  
  registerUser(){
    if (this.userForm.value.password == this.userForm.value.confirm_password)
    {
      this.authServive.saveUser(this.userForm.value).subscribe(res => {
        if (res['status']) {
          this.toastr.success(res['message'], 'Successfully', {
            timeOut: 2000
          });
          this.userForm.reset()
        } else {
          this.toastr.error(res['message'], 'Oops', {
            timeOut: 2000
          });
        }
      })
    } else {
      this.toastr.error('Password didnt matched with confirm password', 'Oops', {
        timeOut: 2000
      });
    }
  }
}
