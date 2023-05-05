import { Component, OnInit } from '@angular/core';
import Users from 'app/models/users';
import { TaskService } from 'app/task.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response : any;
  userData: Users[] = [];
  loginForm : FormGroup;
  serverErrorMsg: string;
  constructor(private taskService: TaskService,
              private router: Router){ }

  ngOnInit(): void {
    console.log(13,"inside login component");
    
    this.loginForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl("",[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]),
    });
  }
  
  login(data) {
      this.getRes(data) 
  } 

  async getRes(data) {

      await this.taskService.loginUser(data.email,data.password).subscribe(
        res => {
          console.log(111,res.token);
          console.log(123,res);
          localStorage.setItem("token",res.token);
          // this.taskService.setToken(res.token);
          console.log("after settoken");
        },
        err => {
          this.serverErrorMsg = err.error;
          console.warn("login error = ",this.serverErrorMsg);
        },
        () => {
          console.log("before navigation");
          this.router.navigateByUrl('/dashboard');
        }
      );
  }

}
