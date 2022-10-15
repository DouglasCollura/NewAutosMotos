import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlquilerComponent } from '../alquiler/alquiler.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AlquilerRoutingModule } from './alquiler-routing.module';


@NgModule({
  declarations: [
    AlquilerComponent
  ],
  imports: [
    CommonModule,
    AlquilerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AlquilerModule { }
