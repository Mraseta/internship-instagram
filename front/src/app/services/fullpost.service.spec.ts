import { TestBed } from '@angular/core/testing';

import { FullpostService } from './fullpost.service';

describe('FullpostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullpostService = TestBed.get(FullpostService);
    expect(service).toBeTruthy();
  });
});
