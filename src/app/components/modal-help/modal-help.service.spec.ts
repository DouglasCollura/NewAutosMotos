import { TestBed } from '@angular/core/testing';

import { ModalHelpService } from './modal-help.service';

describe('ModalHelpService', () => {
  let service: ModalHelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalHelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
