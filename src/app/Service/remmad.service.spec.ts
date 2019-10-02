import { TestBed } from '@angular/core/testing';

import { RemmadService } from './remmad.service';

describe('RemmadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemmadService = TestBed.get(RemmadService);
    expect(service).toBeTruthy();
  });
});
