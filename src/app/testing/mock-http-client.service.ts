import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockHttpClient {

  constructor() { }

  public get() {
    return of('');
  }

  public head() {
    return of('');
  }
}
