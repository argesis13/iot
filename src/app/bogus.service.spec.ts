import { TestBed } from '@angular/core/testing';

import { BogusService } from './bogus.service';

describe('BogusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BogusService = TestBed.get(BogusService);
    expect(service).toBeTruthy();
  });
});
