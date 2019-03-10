import {NO_ERRORS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: () => Promise.resolve()
          }
        }
      ],
      declarations: [ AppComponent ],
      schemas: [
        NO_ERRORS_SCHEMA // do not render child components. side effect: any property is allowed on ány element...
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
