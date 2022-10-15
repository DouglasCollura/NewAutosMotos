import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesComponent } from './planes.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    PlanesComponent
  ],
  imports: [
    CommonModule,
    PlanesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class PlanesModule { }
