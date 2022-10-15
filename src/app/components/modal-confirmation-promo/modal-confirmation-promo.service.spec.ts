import { TestBed } from '@angular/core/testing';

import { ModalConfirmationPromoService } from './modal-confirmation-promo.service';

describe('ModalConfirmationPromoService', () => {
  let service: ModalConfirmationPromoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalConfirmationPromoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
