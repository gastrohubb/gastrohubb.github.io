import { TestBed } from '@angular/core/testing';

import { SessionUtilService } from './session-util.service';

describe('SessionUtilService', () => {
  let service: SessionUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
