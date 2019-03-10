import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  public hasBooking() {
    return this.http.head('http://localhost:3000/klm');
  }

  public getBooking() {
    return this.http.get('http://localhost:3000/klm');
  }
}
