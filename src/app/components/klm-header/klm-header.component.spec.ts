import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlmHeaderComponent } from './klm-header.component';

describe('KlmHeaderComponent', () => {
  let component: KlmHeaderComponent;
  let fixture: ComponentFixture<KlmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlmHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
