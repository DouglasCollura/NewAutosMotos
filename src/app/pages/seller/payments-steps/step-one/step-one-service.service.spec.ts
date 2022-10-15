import { TestBed } from '@angular/core/testing';

import { StepOneServiceService } from './step-one-service.service';

describe('StepOneServiceService', () => {
  let service: StepOneServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepOneServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
