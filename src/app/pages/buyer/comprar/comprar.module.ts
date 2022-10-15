import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComprarRoutingModule } from './comprar-routing.module';
import { ComprarComponent } from './comprar.component';


@NgModule({
  declarations: [
    ComprarComponent
  ],
  imports: [
    CommonModule,
    ComprarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComprarModule { }
