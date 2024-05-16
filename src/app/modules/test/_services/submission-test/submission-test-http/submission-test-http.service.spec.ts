import { TestBed } from '@angular/core/testing';

import { SubmissionTestHttpService } from './submission-test-http.service';

describe('SubmissionTestHttpService', () => {
  let service: SubmissionTestHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionTestHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
