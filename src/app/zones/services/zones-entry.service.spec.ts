import { TestBed, inject } from '@angular/core/testing';

import { ZonesEntryService } from './zones-entry.service';

describe('ZonesEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZonesEntryService]
    });
  });

  it('should be created', inject([ZonesEntryService], (service: ZonesEntryService) => {
    expect(service).toBeTruthy();
  }));
});
