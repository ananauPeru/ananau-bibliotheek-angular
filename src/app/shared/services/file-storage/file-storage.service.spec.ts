/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileStorageService } from './file-storage.service';

describe('Service: FileStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileStorageService]
    });
  });

  it('should ...', inject([FileStorageService], (service: FileStorageService) => {
    expect(service).toBeTruthy();
  }));
});
