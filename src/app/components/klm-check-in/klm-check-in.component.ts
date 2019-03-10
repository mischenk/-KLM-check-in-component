import { Component, OnInit } from '@angular/core';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'klm-check-in',
  templateUrl: './klm-check-in.component.html',
  styleUrls: ['./klm-check-in.component.css']
})
export class CheckInComponent implements OnInit {

  constructor(public bookingService: BookingService) { }

  public ngOnInit() {
    console.log('getting booking...');
    this.bookingService.hasBooking()
      .toPromise()
      .then(hasBooking => {
        console.log('has booking ?', hasBooking);
        return this.bookingService.getBooking();
      })
      .then((bookingResult) => {
        console.log('bookingResult', bookingResult);
      });
  }

}
