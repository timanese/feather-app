import { TestBed } from '@angular/core/testing';

import { GrantAccessToTabsGuard } from './grant-access-to-tabs.guard';

describe('GrantAccessToTabsGuard', () => {
  let guard: GrantAccessToTabsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GrantAccessToTabsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
