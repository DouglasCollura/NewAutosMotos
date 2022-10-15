import { TestBed } from '@angular/core/testing';

import { ModalConfirmPlanService } from './modal-confirm-plan.service';

describe('ModalConfirmPlanService', () => {
  let service: ModalConfirmPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalConfirmPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
