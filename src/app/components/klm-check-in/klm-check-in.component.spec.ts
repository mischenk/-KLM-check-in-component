import {NO_ERRORS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {BookingService} from '../../services/booking.service';

import { CheckInComponent } from './klm-check-in.component';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookingService,
          useValue: {
            getBooking : () => of({})
          }
        },
        {
          provide: Router,
          useValue: {
            navigate : () => Promise.resolve()
          }
        }
      ],
      declarations: [ CheckInComponent ],
      schemas: [
        NO_ERRORS_SCHEMA // do not render child components. side effect: any property is allowed on ány element...
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('1 should not allow requesting a booking with invalid form data', () => {
    component.familyNameControl.setValue('Da Vinci');
    component.bookingCodeControl.setValue('G34KF4');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('2 should allow requesting a booking with valid form data', () => {
    component.familyNameControl.setValue('DaVinci');
    component.bookingCodeControl.setValue('G34KF4');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });

  it('3 should trigger finding a booking after submitting valid form data', () => {
    component.familyNameControl.setValue('HESP');
    component.bookingCodeControl.setValue('PZIGZ3');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
    const getBookingSpy = spyOn(component.bookingService, 'getBooking').and.callThrough();
    button.click();
    fixture.detectChanges();
    expect(getBookingSpy).toHaveBeenCalledWith(
      component.familyNameControl.value,
      component.bookingCodeControl.value
    );
  });
});
