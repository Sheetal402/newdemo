import { async, ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskService } from 'app/task.service';
import { of, throwError } from 'rxjs';


const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getUsers']);

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let taskSpy;
    // const TaskServiceObj = jasmine.createSpyObj('TaskService',['getUsers']);
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [
                        RouterTestingModule,
                        HttpClientTestingModule,
                        MatDialogModule
                     ],
            providers: [{provide: TaskService, useValue: taskServiceSpy}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        taskSpy = taskServiceSpy.getUsers.and.callThrough();
        // fixture.detectChanges();
        fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('taskService.getUsers() should called', () => {
        fixture.whenStable();
        expect(taskSpy).toBeTruthy();
    });

    it('taskService.getUsers() throws error', () => {
        const data = {};
        taskSpy = taskServiceSpy.getUsers.and.returnValue(of(data));
        // spyOn(taskServiceSpy,'getUsers').and.returnValue(of(data));
        component.ngOnInit();
        expect(taskSpy).toBeTruthy();
        // expect(component.userData.length).toBe(1);
    })
});