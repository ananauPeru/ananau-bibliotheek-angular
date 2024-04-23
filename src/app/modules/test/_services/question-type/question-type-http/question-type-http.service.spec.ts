/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionTypeHttpService } from './question-type-http.service';

describe('Service: QuestionTypeHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionTypeHttpService]
    });
  });

  it('should ...', inject([QuestionTypeHttpService], (service: QuestionTypeHttpService) => {
    expect(service).toBeTruthy();
  }));
});
