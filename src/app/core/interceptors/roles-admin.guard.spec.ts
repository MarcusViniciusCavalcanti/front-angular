import { TestBed } from '@angular/core/testing';

import { RolesAdminGuard } from './roles-admin.guard';

describe('RolesAdminGuard', () => {
  let guard: RolesAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolesAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
