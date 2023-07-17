import { TestBed } from '@angular/core/testing';

import { PlayerDashboardService } from './player-dashboard.service';

describe('PlayerDashboardService', () => {
  let service: PlayerDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
