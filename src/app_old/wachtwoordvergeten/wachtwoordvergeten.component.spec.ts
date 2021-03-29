import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WachtwoordvergetenComponent } from './wachtwoordvergeten.component';

describe('WachtwoordvergetenComponent', () => {
  let component: WachtwoordvergetenComponent;
  let fixture: ComponentFixture<WachtwoordvergetenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WachtwoordvergetenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WachtwoordvergetenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
