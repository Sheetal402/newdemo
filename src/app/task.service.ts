import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'jquery';
import { Observable } from 'rxjs';
import Users from '../app/models/users';
import Todo from './models/todo';
import { WebService } from './web.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
    readonly ROOT_URL;
  constructor(private webService: WebService,
              private ngbModal: MatDialog,
              private http: HttpClient,
              private router: Router)
             {
      this.ROOT_URL = "http://localhost:3000";

              }

  getUsers() {
    return this.webService.get('users');
  }

  getTableData(pageNumber: Number, pageSize: Number): Observable<any>{
    return this.webService.get(`users?pageNo=${pageNumber}&size=${pageSize}`);
  }

  createUsers(formData : any) {
        console.log("inside taskService create",formData);
        this.webService.post('users',formData).subscribe((response: any) => {
            this.router.navigateByUrl('/login');
            console.log("### response = ",response);
            return response
        },(err) => {
            return err.message;
          });
  }

  updateUsers(_id, data) {
    console.log("inside taskService update",data);

    return this.webService.patch(`users/${_id}`, data);

  }

  updateProfilepic(_id, data) {
    console.log("inside taskService update",data);

    return this.webService.patch(`users/${_id}`, data);
  }

  deleteUsers(_id: string){
    return this.webService.delete(`users/${_id}`);
  }

  loginUser(email:string, password:string):Observable<any> {
    console.log("^^ Inside taskService Loginuser");
    
    return this.webService.post('auth',{email, password});        
  }

  getLoggedUser(): Observable<any>{
    return this.http.get(`${this.ROOT_URL}/users/me`);
  }

  getComments(): Observable<any>{
    console.log("inside taskService getComment");
    return this.webService.get('todo');
  }

  createComments(content: String) {
    console.log("inside taskService createComment");
    this.webService.post('todo', {content}).subscribe((response: any) => {
      console.log("### response from create comment= ",response);
      return response
    },(err) => {
      return err.message;
    });
  }

  searchComment(searchTerm  : String): Observable<any> {
    return this.webService.get(`todo/search/${searchTerm}`);
  }

  deleteComments(_id: string) {
    console.log("inside taskservice deletecomment");
    const res = this.webService.delete(`todo/${_id}`).subscribe();
    // return this.webService.delete(`todo/${_id}`);
  }

  updateComments(_id: String, content: String) {
        console.log("inside taskService update comment",_id);
        this.webService.patch(`todo/${_id}`, {content}).subscribe((response: any) => {
            // this.router.navigateByUrl('/dashboard');
            console.log("### response from update comment = ",response);
            return response
        },(err) => {
            return err.message;
        });
  }

  setToken(token){
    localStorage.setItem('token',token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = localStorage.getItem('token');
    if(token){
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
    } else {
        return null;
    }
  }

  isLoggedIn(){
    console.log("inside is logged in");
    
    var userPayload = this.getUserPayload();
    console.log("after getuserpayload() call",userPayload);
    if(userPayload){
        console.log("(%%) userPayload.exp > Date.now() / 1000 = ",userPayload.exp > Date.now() / 1000);
        
        return userPayload.exp > Date.now() / 1000;
    } else {
        return false;
    }
  }


    /* @param data
     * @param componentAsContent
     * @param successCallback
     * @param cancelCallback
     * @param config
     * @param finallyCallback
     */
    openConfirmationModal(
        data: any,
        componentAsContent: any,
        successCallback?: any,
        cancelCallback?: any,
        config?: any,
        finallyCallback?: any
    ) {
        const modalRef = this.ngbModal.open(componentAsContent, config);
        for (const prop in data) {
            if (data.hasOwnProperty(prop)) {
                modalRef.componentInstance[prop] = data[prop];
            }
        }
        modalRef.afterClosed().subscribe((result) => {
            if (result instanceof Object && result.reason === "success") {
                if (successCallback instanceof Function) {
                    successCallback(result.data);
                }
            } else {
                if (result === "success") {
                    if (successCallback instanceof Function) {
                        successCallback();
                    }
                } else if (result === "cancel") {
                    if (cancelCallback instanceof Function) {
                        cancelCallback();
                    }
                }
            }
            if (finallyCallback instanceof Function) {
                finallyCallback();
            }
        }, () => {
            if (cancelCallback instanceof Function) {
                return cancelCallback();
            }
        });
        return modalRef;
    }

}
    
