import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { TaskService } from 'app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editcomment',
  templateUrl: './editcomment.component.html',
  styleUrls: ['./editcomment.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class EditcommentComponent implements OnInit {
  updateCommentForm : FormGroup;

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,
              private taskService: TaskService,
              public dialogRef: MatDialogRef<EditcommentComponent>,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    // console.log(2334,"data = ",this.data);
    this.data.content = this.data.content.replace(/<br\s*[\/]?>/gi, "\n");
    // console.log(2334,"data = ",this.data);
    this.updateCommentForm.patchValue(this.data);
  }

  initForm(){
    this.updateCommentForm = new FormGroup({
      content : new FormControl("")
    })
  }

  onUpdate(item){
    // console.log(2334,"item = ",item);
    item.content = item.content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    // console.log(2334,"item = ",item);
    this.taskService.updateComments(this.data._id, item.content);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
