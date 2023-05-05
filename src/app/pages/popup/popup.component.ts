import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from 'app/task.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupComponent>,
              private taskService: TaskService,
              private router: Router
              ) { }

  ngOnInit(): void {

  }
  onClose(): void {
    this.dialogRef.close();
  }

  onOk() {
    this.taskService.deleteComments(this.data._id);
    this.dialogRef.close();
  }
}
