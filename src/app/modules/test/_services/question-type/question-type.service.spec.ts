/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionTypeService } from './question-type.service';

describe('Service: QuestionType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionTypeService]
    });
  });

  it('should ...', inject([QuestionTypeService], (service: QuestionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
