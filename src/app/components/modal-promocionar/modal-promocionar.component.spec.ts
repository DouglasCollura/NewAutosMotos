import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPromocionarComponent } from './modal-promocionar.component';

describe('ModalPromocionarComponent', () => {
  let component: ModalPromocionarComponent;
  let fixture: ComponentFixture<ModalPromocionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPromocionarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPromocionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
