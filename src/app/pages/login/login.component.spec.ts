import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AppModule } from 'app/app.module';
import { TaskService } from 'app/task.service';
import { FormBuilder } from '@angular/forms';
// import { DashboardComponent } from '../dashboard/dashboard.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: TaskService;
  let fixture: ComponentFixture<LoginComponent>;

  let router: Router;
  let blankUser = {email:"",password:""};
  let validUser = {email:"dhvija@example.com",password:"DH1@jjjj"};
  // const loginServiceSpy = jasmine.createSpyObj('TaskService',['loginUser']);
  let loginSpy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule],
      providers: [ FormBuilder ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function loginUserForm(email, password) {
    fixture.componentInstance.loginForm.controls['email'].setValue(email);
    fixture.componentInstance.loginForm.controls['password'].setValue(password);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.serverErrorMsg).toBeUndefined();
  })

  it('login should be true when called login()', () => {
    component.login(blankUser);
    expect(component.login).toBeTruthy();
    expect(component.serverErrorMsg).toBeFalsy();
  })
  
  it('getRes() should be called on login() call', () => {
    spyOn(component,'getRes').and.callThrough();
    component.login(validUser);
    expect(component.getRes).toHaveBeenCalled();
  });
})
