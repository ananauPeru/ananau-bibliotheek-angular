import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsOverviewComponent } from './registrations-overview.component';

describe('RegistrationsOverviewComponent', () => {
  let component: RegistrationsOverviewComponent;
  let fixture: ComponentFixture<RegistrationsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
