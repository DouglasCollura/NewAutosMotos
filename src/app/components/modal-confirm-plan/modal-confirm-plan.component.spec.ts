import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmPlanComponent } from './modal-confirm-plan.component';

describe('ModalConfirmPlanComponent', () => {
  let component: ModalConfirmPlanComponent;
  let fixture: ComponentFixture<ModalConfirmPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
