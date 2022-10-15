import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsSuccessComponent } from './modals-success.component';

describe('ModalsSuccessComponent', () => {
  let component: ModalsSuccessComponent;
  let fixture: ComponentFixture<ModalsSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
