import { TestBed } from '@angular/core/testing';

import { ModalSuccessService } from './modal-success.service';

describe('ModalSuccessService', () => {
  let service: ModalSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
