import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Users from 'app/models/users';
import { TaskService } from 'app/task.service';
import { find } from 'rxjs';

@Component({
    selector: 'icons-cmp',
    moduleId: module.id,
    templateUrl: 'icons.component.html',
    styleUrls: ['./icons.component.css']
})

export class IconsComponent{

    profilepic: any;
    public registrationForm : FormGroup;
    
    receivedData: Users[] = [];

    constructor(private taskService: TaskService,
                private router: Router) {
    }

    public async ngOnInit() {
        console.log(12,"inside register component");
        this.initRegistrationForm();
    }

    initRegistrationForm() {
        this.registrationForm = new FormGroup({
            fname: new FormControl("",[Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
            lname: new FormControl("",[Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
            address: new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
            profilepic: new FormControl(""),
            // contact: new FormControl("",[Validators.required, Validators.maxLength(10), Validators.pattern('^[789]\d{9,9}$')]),
            // contact: new FormControl("",[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            contact: new FormControl("",[Validators.required, Validators.minLength(10)]),
            email: new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
            password: new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(1024), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]),
            cpassword: new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(1024), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')])
        })
    }

    onFileSelected(event:any) {
        this.profilepic = event.target.files[0];
        console.log("profile pic = ", this.profilepic);
    }

    submit(data) {
      console.log(123,"res b4 api call = ", data);
      const formdata = new FormData();
       formdata.append('fname',data.fname);
       formdata.append('lname',data.lname);
       formdata.append('address',data.address);
       formdata.append('profilepic',this.profilepic);
       formdata.append('contact',data.contact);
       formdata.append('email',data.email);
       formdata.append('password',data.password);
       formdata.append('cpassword',data.cpassword);
       console.log("%%form data = ",formdata);

    //    let res = this.taskService.createUsers(formdata.get('fname'),formdata.get(lname),formdata[0].address,formdata[0].profilepic,formdata[0].contact,formdata[0].email,formdata[0].password,formdata[0].cpassword);
    
        let res = this.taskService.createUsers(formdata);
       console.log(333,"this is res", res);
        // this.router.navigateByUrl('/login');
    }
    
}
