/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExerciseHttpService } from './exercise-http.service';

describe('Service: ExerciseHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseHttpService]
    });
  });

  it('should ...', inject([ExerciseHttpService], (service: ExerciseHttpService) => {
    expect(service).toBeTruthy();
  }));
});
