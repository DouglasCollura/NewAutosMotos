import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsStepsComponent } from './payments-steps.component';

describe('PaymentsStepsComponent', () => {
  let component: PaymentsStepsComponent;
  let fixture: ComponentFixture<PaymentsStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
