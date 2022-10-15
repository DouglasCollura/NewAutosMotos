import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaVehiculoComponent } from './venta-vehiculo.component';

describe('VentaVehiculoComponent', () => {
  let component: VentaVehiculoComponent;
  let fixture: ComponentFixture<VentaVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
