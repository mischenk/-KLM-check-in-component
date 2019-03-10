import {NO_ERRORS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from '@angular/router';
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
            hasBooking : () => ({
              toPromise : () => new Promise((res, rej) => res(true))
            }),
            getBooking : () => ({
              toPromise : () => new Promise((res, rej) => res({}))
            }),
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
});
