import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  
  constructor() { }

  public getToken(): string {
    // console.log("**--**",localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  // public isTokenExpired(token) {
  //   const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  //   return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  // }
}

