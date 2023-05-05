import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Users from 'app/models/users';
import { TaskService } from 'app/task.service';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ["./user.component.css"]
})

export class UserComponent implements OnInit{
    updateUserForm : FormGroup;
    // userData: any;
    userData: any;
    res : any;
    base64String : any;
    profilepic: any;

    constructor(private taskService: TaskService, 
                public http: HttpClient,
                public router: Router) {
        
    }

    async ngOnInit(){
        this.initRegistrationForm()
        console.log(13,"inside user component");
         await this.taskService.getLoggedUser().subscribe((data) => {
                console.log(336699,"data in user = ",data);
                this.userData=data;
                this.userData.profilepic = this.taskService.ROOT_URL+"/"+this.userData.profilepic;
                // console.log("user Data = ",this.userData);
                this.updateUserForm.patchValue(this.userData);
                // console.log("user Data profilepic = ",this.userData.profilepic.name);
                // this.base64String = this.arrayBufferToBase64(data.profilepic.data.data);
                // console.log("base64String = ",this.base64String);
        }); 
        // console.log(12355,"userdata in update = ",this.userData);
                
    }

    initRegistrationForm() {
        this.updateUserForm = new FormGroup({
            fname: new FormControl("",[Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
            lname: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
            address: new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            profilepic: new FormControl(""),
            img: new FormControl(""),
            contact: new FormControl("",[Validators.required, Validators.minLength(10)]),
            email: new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
            password: new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(1024), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]),
            cpassword: new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(1024), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')])
        })
    }

    // arrayBufferToBase64(buffer: ArrayBuffer): string {
    //     let binary = '';
    //     const bytes = new Uint8Array(buffer);
    //     const len = bytes.byteLength;
    //     for (let i = 0; i < len; i++) {
    //       binary += String.fromCharCode(bytes[i]);
    //     }
    //     return btoa(binary);
    //   }

    onFileSelected(event) {
        this.profilepic = event.target.files[0];

        console.log("profile pic update= ", this.profilepic);
        console.log("profile pic update= ", this.updateUserForm.value);
        this.reload();
    }

    reload(){
        const formdata = new FormData();
        formdata.append('profilepic',this.profilepic);
        console.log("%%form data = ",formdata);

        this.taskService.updateProfilepic(this.userData._id,formdata).subscribe((res)=>{
            console.log("res from service in user: ",res);
            if(res){
                this.taskService.getLoggedUser().subscribe((data) => {
                    console.log(336690,"data in user = ",data);
                    this.userData=data;
                    console.log(336694,"userdatadata in user = ",this.userData);
                    this.updateUserForm.patchValue(this.userData);
                    // console.log("Data = ",data.profilepic.name);
                    //  this.base64String = this.arrayBufferToBase64(data.profilepic.data.data);
                    // console.log("base64String = ",this.base64String);
                }); 
            }
        });
    }

    submit(data) {
        console.log("inside submit()");
        
        console.log(321,"data b4 api call",data);
        console.log(321,"updateUserForm b4 api call",this.updateUserForm);

       const formdata = new FormData();
       formdata.append('fname',data.fname);
       formdata.append('lname',data.lname);
       formdata.append('address',data.address);
       formdata.append('profilepic',this.profilepic);
       formdata.append('contact',data.contact);
       formdata.append('email',data.email);
       formdata.append('password',this.userData.password);
       formdata.append('cpassword',this.userData.cpassword);
       console.log("%%form data = ",formdata);

       this.taskService.updateUsers(this.userData._id,formdata).subscribe((res)=>{
            console.log("res from service in user: ",res);
            if(res){
                this.taskService.getLoggedUser().subscribe((data) => {
                    console.log(336691,"data in user = ",data);
                    this.userData=data;
                    this.updateUserForm.patchValue(this.userData);
                    // console.log("Data = ",data.profilepic.name);
                    //  this.base64String = this.arrayBufferToBase64(data.profilepic.data.data);
                    // console.log("base64String = ",this.base64String);
                }); 
            }
       });
    }
}
