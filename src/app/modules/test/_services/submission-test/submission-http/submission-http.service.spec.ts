import { TestBed } from '@angular/core/testing';

import { SubmissionHttpService } from './submission-http.service';

describe('SubmissionHttpService', () => {
  let service: SubmissionHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
