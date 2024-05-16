import { TestBed } from '@angular/core/testing';

import { SubmissionTestService } from './submission-test.service';

describe('SubmissionTestService', () => {
  let service: SubmissionTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
