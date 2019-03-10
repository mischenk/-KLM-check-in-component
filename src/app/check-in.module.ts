import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CheckInComponent } from './components/klm-check-in/klm-check-in.component';
import { KlmHeaderComponent } from './components/klm-header/klm-header.component';
import { BookingComponent } from './components/booking/booking.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    CheckInComponent,
    KlmHeaderComponent,
    BookingComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    NoopAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'check-in',
        component: CheckInComponent
      },
      {
        path: 'booking',
        component: BookingComponent
      }
    ], {
      enableTracing: false, // !environment.production,
      initialNavigation: 'disabled',
      useHash: true
    }),
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class CheckInModule { }
