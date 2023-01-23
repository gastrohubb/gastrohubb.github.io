import { TestBed } from '@angular/core/testing';

import { GhbServiceClientService } from './ghb-service-client.service';

describe('GhbServiceClientService', () => {
  let service: GhbServiceClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhbServiceClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
