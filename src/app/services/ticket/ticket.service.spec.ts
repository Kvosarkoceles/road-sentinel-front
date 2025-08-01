import { TestBed } from '@angular/core/testing';

import { SolicitudesService } from './ticket.service';

describe('SolicitudesService', () => {
  let service: SolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
