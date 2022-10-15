import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecambiosRoutingModule } from './recambios-routing.module';
import { RecambiosComponent } from './recambios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecambiosComponent,
  ],
  imports: [
    CommonModule,
    RecambiosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RecambiosModule { }
