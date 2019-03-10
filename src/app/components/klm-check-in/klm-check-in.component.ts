import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {noop, Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {Booking, BookingService} from '../../services/booking.service';
import * as XRegExp from 'xregexp';

@Component({
  selector: 'klm-check-in',
  templateUrl: './klm-check-in.component.html',
  styleUrls: ['./klm-check-in.component.scss']
})
export class CheckInComponent {

  public form: FormGroup = new FormGroup({});
  public familyNameControl: FormControl;
  public bookingCodeControl: FormControl;

  public bookingFeedback: string;

  public get familyNameFieldErrors(): string[] {
    const errors = [];
    this.familyNameControl.hasError('required') ? errors.push('Enter a family name') : noop();
    this.familyNameControl.hasError('minlength') ? errors.push('rename your family name longer :)') : noop();
    this.familyNameControl.hasError('maxlength') ? errors.push('truncate your family name :)') : noop();
    this.familyNameControl.hasError('notLetter') ? errors.push('Your family name should only contain letters') : noop();
    return errors;
  }

  public get bookingCodeFieldErrors(): string[] {
    const errors = [];
    this.familyNameControl.hasError('required') ? errors.push('Enter a booking code') : noop();
    this.familyNameControl.hasError('minlength') ? errors.push('too short booking code') : noop();
    this.familyNameControl.hasError('maxlength') ? errors.push('booking code is too long') : noop();
    this.familyNameControl.hasError('pattern') ? errors.push('booking code should only contain letters and numbers') : noop();
    return errors;
  }

  constructor(
    public bookingService: BookingService,
    private router: Router
  ) {
    this.familyNameControl = new FormControl(
      { value: '', disabled: false },
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.familyNameValidator
      ]
    );

    this.bookingCodeControl = new FormControl(
      { value: '', disabled: false },
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(6),
        Validators.pattern('[a-zA-Z2-9]*')
      ]
    );

    this.form.addControl('familyName', this.familyNameControl);
    this.form.addControl('bookingCode', this.bookingCodeControl);
  }

  private familyNameValidator(c: AbstractControl): ValidationErrors | null {
    const unicodeLetterTest = XRegExp.test(c.value, XRegExp('^\\pL+$'));
    if (unicodeLetterTest) {
      return null;
    } else {
      return { notLetter : 'family name can only consist of characters.' };
    }
  }

  public onFindBookingClick() {
    this.getBooking(this.form.value.familyName, this.form.value.bookingCode).pipe(
      tap((result: Booking | string) => {
        if (typeof result !== 'string') {
          this.bookingFeedback = 'loading booking information...';
          this.bookingService.selectedBooking = result;
          setTimeout(() => this.router.navigate(['/booking']), 1000);
        } else {
          this.bookingFeedback = result;
        }
      })
    ).subscribe();
  }

  private getBooking(familyName: string, bookingCode: string): Observable<string | Booking> {
    console.log('getting booking for...', familyName, 'with code: ', bookingCode);
    return this.bookingService.hasBooking(familyName, bookingCode)
      .pipe(
        switchMap<boolean, Booking | string>(hasBooking => {
          if (hasBooking) {
            return this.bookingService.getBooking(familyName, bookingCode).pipe(
              map(result => result !== undefined ? result : 'booking does not exist')
            );
          } else {
            return 'booking does not exist';
          }
        })
      );
  }

}
