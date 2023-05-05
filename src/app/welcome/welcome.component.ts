import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
// import Users from 'app/models/users';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { LoginComponent } from 'app/pages/login/login.component';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {
  text = 'welcome page'
  // userData: Users[] = [];

  constructor(private router: Router) { 
              }

  ngOnInit(): void {
    console.log(10,"inside welcome component");
    
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  register(){
    this.router.navigateByUrl('/register');
  }
}
