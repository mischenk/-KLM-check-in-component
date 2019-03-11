import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Booking {
  bookingCode: string;
  contactDetails: any[];
  itinerary: any;
  passengers: {
    id: number;
    firstName: string;
    lastName: string;
    title: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  // tslint:disable-next-line:variable-name
  private _currentBooking: Booking;

  public get selectedBooking(): Booking {
    return this._currentBooking;
  }

  public set selectedBooking(booking: Booking) {
    this._currentBooking = booking;
  }

  constructor(private http: HttpClient) { }

  public getBooking(familyName: string, bookingCode: string): Observable<Booking> {
    return this.http.get<Booking[]>('http://localhost:3000/bookings').pipe(
      map((allBookings: Booking[]) => {
        return allBookings.find((booking: Booking) => {
          return booking.bookingCode.toLocaleLowerCase() === bookingCode.toLocaleLowerCase() &&
            booking.passengers.lastName.toLocaleLowerCase() === familyName.toLocaleLowerCase();
          });
      })
    );
  }
}
