import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsComponent } from './icons.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('IconsComponent', () => {
    let component: IconsComponent;
    let fixture: ComponentFixture<IconsComponent>;
    let validUser = {};
    // let validUser = {fname:"Dhvija", lname:"Shah", address:"49, Safal", contact:"1234567890", email:"dhvija@example.com", password:"DH1@jjjj", cpassword:"DH1@jjjj"};
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IconsComponent],
            imports: [
                        HttpClientTestingModule,
                        MatDialogModule,
                        RouterTestingModule
                     ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Form should be invalid when empty', () => {
        let validUser = {fname:"", lname:"", address:"", profilepic:"", contact:"", email:"", password:"", cpassword:""};
        component.registrationForm.setValue(validUser);
        expect(component.registrationForm.valid).toBeFalsy(); 
    });

    it('Form should be valid when valid data passed', () => {
        validUser = {fname:"Dhvija", lname:"Shah", address:"49, Safal", profilepic: "abc.png" , contact:"1234567890", email:"dhvija@example.com", password:"DH1@jjjj", cpassword:"DH1@jjjj"};
        component.registrationForm.setValue(validUser);
        expect(component.registrationForm.valid).toBeTruthy(); 
    });
    
    it('user should register on submit()', () => {
        validUser = {fname:"Dhvija", lname:"Shah", address:"49, Safal", contact:"1234567890", email:"dhvija@example.com", password:"DH1@jjjj", cpassword:"DH1@jjjj"};
        spyOn(component,'submit');
        const submitButton = fixture.debugElement.nativeElement.querySelector('button');
        submitButton.dispatchEvent(new Event("click"));
        component.submit(validUser);
        expect(component.submit).toBeTruthy();
    });
});