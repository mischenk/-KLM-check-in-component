import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
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

  public familyNameErrorStrings = {
    required : 'Enter a family name',
    minlength : 'Family name too short',
    maxlength : 'Family name too long',
    notletter : 'Family name should only contain letters'
  };

  public bookingCodeErrorStrings = {
    required : 'Enter a booking code',
    minlength : 'Booking code is too short',
    maxlength : 'Booking code is too long',
    pattern : 'Booking code should only contain letters and numbers'
  };

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

  public onFindBookingClick() {
    this.bookingService.getBooking(this.form.value.familyName, this.form.value.bookingCode).pipe(
      map((result: Booking) => {
        if (result === undefined) {
          return this.bookingFeedback = 'booking does not exist';
        }
        this.bookingFeedback = 'loading booking information...';
        this.bookingService.selectedBooking = result;
        return this.router.navigate(['/booking']);
      })
    ).subscribe();
  }

  private familyNameValidator(c: AbstractControl): ValidationErrors | null {
    const unicodeLetterTest = XRegExp.test(c.value, XRegExp('^\\pL+$'));
    if (unicodeLetterTest) {
      return null;
    } else {
      return { notletter : 'family name can only consist of characters.' };
    }
  }

  private mapErrorStrings(control: AbstractControl) {
    return (errorStrings: {[index: string]: string}) => {
      return Object.keys(control.errors).map(key => errorStrings[key]);
    };
  }

}
