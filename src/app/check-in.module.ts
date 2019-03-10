import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CheckInComponent } from './components/klm-check-in/klm-check-in.component';
import { KlmHeaderComponent } from './components/klm-header/klm-header.component';

@NgModule({
  declarations: [
    CheckInComponent,
    KlmHeaderComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    NoopAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'check-in',
        component: CheckInComponent
      }
    ], {
      enableTracing: false, // !environment.production,
      initialNavigation: 'enabled',
      useHash: true
    }),
  ],
  providers: [],
  bootstrap: [CheckInComponent]
})
export class CheckInModule { }
