import { TestBed } from '@angular/core/testing';

import { StepTwoServiceService } from './step-two-service.service';

describe('StepTwoServiceService', () => {
  let service: StepTwoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepTwoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
