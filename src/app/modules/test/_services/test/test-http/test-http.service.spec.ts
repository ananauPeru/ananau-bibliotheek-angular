/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestHttpService } from './test-http.service';

describe('Service: TestHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestHttpService]
    });
  });

  it('should ...', inject([TestHttpService], (service: TestHttpService) => {
    expect(service).toBeTruthy();
  }));
});
