import { TestBed, async, inject } from '@angular/core/testing';

import { CheckAuthGuard } from './check-auth.guard';

describe('CheckAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckAuthGuard]
    });
  });

  it('should ...', inject([CheckAuthGuard], (guard: CheckAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
