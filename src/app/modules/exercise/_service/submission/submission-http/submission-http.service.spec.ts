/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubmissionHttpService } from './submission-http.service';

describe('Service: SubmissionHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmissionHttpService]
    });
  });

  it('should ...', inject([SubmissionHttpService], (service: SubmissionHttpService) => {
    expect(service).toBeTruthy();
  }));
});
