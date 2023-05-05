import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Users from 'app/models/users';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'app/task.service';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit{

    userData: Users[] = [];
    colunmsToDisplay = ['fname','lname','address','contact'];
    dataSource : MatTableDataSource<Users> = new MatTableDataSource();
    
    totalRows = 0;
    pageSize = 3;
    currentPage = 1;
    pageSizeOptions: number[] = [3, 6, 9];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log("#$% datasource.paginator = ",this.dataSource.paginator);    
    }

    constructor(private taskService: TaskService) {
        // console.log(11,"inside constructor");
    }

    ngOnInit(){
        console.log(11,"inside table component");
        this.loadData();       
    }

    
    loadData() {
        // this.isLoading = true;
        let URL = `http://localhost/database.php?pageno=${this.currentPage}&per_page=${this.pageSize}`;
        this.taskService.getTableData(this.currentPage,this.pageSize).subscribe((data) => {
            // console.log(3435,"data = ",data);
            // console.log(3436,"data.rows = ",data.rows);
            this.dataSource.data = data;
            setTimeout(() => {
                this.paginator.pageIndex = this.currentPage;
                this.paginator.length = data.length;
            });
        })
      }

    pageChanged(event: PageEvent) {
        // console.log("event = ",{ event });
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.loadData();
    }
}
