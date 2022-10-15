import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RepuestosRoutingModule } from './repuestos-routing.module';
import { RepuestosComponent } from './repuestos.component';


@NgModule({
  declarations: [
    RepuestosComponent
  ],
  imports: [
    CommonModule,
    RepuestosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RepuestosModule { }
