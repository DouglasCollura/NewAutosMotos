import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditTiendaComponent } from './modal-edit-tienda.component';

describe('ModalEditTiendaComponent', () => {
  let component: ModalEditTiendaComponent;
  let fixture: ComponentFixture<ModalEditTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
