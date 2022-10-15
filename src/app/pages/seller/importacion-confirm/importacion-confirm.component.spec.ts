import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacionConfirmComponent } from './importacion-confirm.component';

describe('ImportacionConfirmComponent', () => {
  let component: ImportacionConfirmComponent;
  let fixture: ComponentFixture<ImportacionConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportacionConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
