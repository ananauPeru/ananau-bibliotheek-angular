import { TestBed } from '@angular/core/testing';

import { OntleenService } from './ontleen.service';

describe('OntleenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OntleenService = TestBed.get(OntleenService);
    expect(service).toBeTruthy();
  });
});
