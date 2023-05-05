import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Users from 'app/models/users';
import { TaskService } from 'app/task.service';
import * as _ from "lodash"; 
import { MatDialog} from '@angular/material/dialog'
import { CommentComponent } from '../comment/comment.component';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    commentForm: FormGroup;
    userData: Users[] = [];
    constructor(private router: Router,
                private taskService: TaskService,
               ) {
                  console.log(18,"inside dashboard constructor");
                 }

    ngOnInit(){
      console.log(19,"inside dashboard component");
      this.taskService.getUsers()
        .subscribe((data: Users[]) => {console.log(987,"data = ",data);this.userData = data;});
    }
}
