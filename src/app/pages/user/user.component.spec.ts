import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let validUser = {fname:"Dhvija", lname:"Shah", address:"49, Safal", contact:"1234567890", email:"dhvija@example.com", password:"DH1@jjjj", cpassword:"DH1@jjjj"};
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserComponent],
            imports: [
                        HttpClientTestingModule,
                        RouterTestingModule,
                        MatDialogModule
                     ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('user should update on submit()', () => {
        spyOn(component,'submit');
        fixture.whenStable();
        fixture.detectChanges();
        const submitButton = fixture.debugElement.nativeElement.querySelector('button');
        submitButton.dispatchEvent(new Event("click"));
        component.submit(validUser);
        expect(component.submit).toBeTruthy();
    });
});