import { TestBed } from '@angular/core/testing';

import { ModalEditTiendaService } from './modal-edit-tienda.service';

describe('ModalEditTiendaService', () => {
  let service: ModalEditTiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEditTiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
