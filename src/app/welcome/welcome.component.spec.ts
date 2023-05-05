import { ComponentFixture, TestBed, waitForAsync, tick, inject } from '@angular/core/testing';
import { async } from 'rxjs/internal/scheduler/async';

import { WelcomeComponent } from './welcome.component';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'app/pages/login/login.component';
import { IconsComponent } from 'app/pages/icons/icons.component';
import { RegistersComponent } from 'app/pages/registers/registers.component';
import { By } from '@angular/platform-browser';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: LoginComponent },
                  { provide: Router, useValue: RegistersComponent }],
      imports: [RouterTestingModule,
                HttpClientModule,
                MatDialogModule],
      declarations: [ WelcomeComponent ]
    })
    .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as text 'welcome page'`, waitForAsync(() => {
    expect(component.text).toEqual('welcome page');
  }))

  it(`should navigated to '/'login`, (() => {
    spyOn(component,'login');
    fixture.whenStable();
    fixture.detectChanges();
    const loginButton = fixture.debugElement.nativeElement.querySelector('button');
    loginButton.dispatchEvent(new Event("click"));
    expect(component.login).toHaveBeenCalled();
  }));

  it(`should navigated to '/'register`, (() => {
    spyOn(component,'register');
    fixture.whenStable();
    fixture.detectChanges();
    const registerButton = fixture.debugElement.query(By.css('.register'));
    registerButton.triggerEventHandler("click", null);
    expect(component.register).toHaveBeenCalled();
  }));

})

