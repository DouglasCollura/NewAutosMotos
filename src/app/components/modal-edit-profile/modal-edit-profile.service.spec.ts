import { TestBed } from '@angular/core/testing';

import { ModalEditProfileService } from './modal-edit-profile.service';

describe('ModalEditProfileService', () => {
  let service: ModalEditProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEditProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
