import { TestBed } from '@angular/core/testing';

import { GrantAccessToLoginGuard } from './grant-access-to-login.guard';

describe('GrantAccessToLoginGuard', () => {
  let guard: GrantAccessToLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GrantAccessToLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
