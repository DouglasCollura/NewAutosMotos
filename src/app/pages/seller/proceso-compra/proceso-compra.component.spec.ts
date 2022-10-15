import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoCompraComponent } from './proceso-compra.component';

describe('ProcesoCompraComponent', () => {
  let component: ProcesoCompraComponent;
  let fixture: ComponentFixture<ProcesoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
