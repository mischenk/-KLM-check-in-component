import {HttpClient} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {MockHttpClient} from '../testing/mock-http-client.service';

import { BookingService } from './booking.service';

describe('BookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: MockHttpClient }
    ]
  }));

  it('should be created', () => {
    const service: BookingService = TestBed.get(BookingService);
    expect(service).toBeTruthy();
  });
});
