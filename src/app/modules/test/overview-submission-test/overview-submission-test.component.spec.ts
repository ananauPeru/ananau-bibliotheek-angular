import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSubmissionTestComponent } from './overview-submission-test.component';

describe('OverviewSubmissionTestComponent', () => {
  let component: OverviewSubmissionTestComponent;
  let fixture: ComponentFixture<OverviewSubmissionTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewSubmissionTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSubmissionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
