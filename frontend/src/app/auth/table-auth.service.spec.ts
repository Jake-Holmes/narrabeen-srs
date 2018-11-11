import { TestBed } from '@angular/core/testing';

import { TableAuthService } from './table-auth.service';

describe('TableAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableAuthService = TestBed.get(TableAuthService);
    expect(service).toBeTruthy();
  });
});
