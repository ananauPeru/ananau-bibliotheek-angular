import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionTestDetailsComponent } from './submission-test-details.component';

describe('SubmissionTestDetailsComponent', () => {
  let component: SubmissionTestDetailsComponent;
  let fixture: ComponentFixture<SubmissionTestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionTestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionTestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
