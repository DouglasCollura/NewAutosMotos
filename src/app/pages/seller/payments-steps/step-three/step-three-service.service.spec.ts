import { TestBed } from '@angular/core/testing';

import { StepThreeServiceService } from './step-three-service.service';

describe('StepThreeServiceService', () => {
  let service: StepThreeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepThreeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
