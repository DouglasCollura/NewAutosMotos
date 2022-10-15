import { TestBed } from '@angular/core/testing';

import { ModalPromocionarService } from './modal-promocionar.service';

describe('ModalPromocionarService', () => {
  let service: ModalPromocionarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalPromocionarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
