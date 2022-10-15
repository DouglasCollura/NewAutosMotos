import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationPromoComponent } from './modal-confirmation-promo.component';

describe('ModalConfirmationPromoComponent', () => {
  let component: ModalConfirmationPromoComponent;
  let fixture: ComponentFixture<ModalConfirmationPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmationPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmationPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
