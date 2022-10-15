import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AnuncioRoutingModule } from './anuncio-routing.module';
import { AnuncioComponent } from './anuncio.component';


@NgModule({
  declarations: [
    AnuncioComponent
  ],
  imports: [
    CommonModule,
    AnuncioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AnuncioModule { }
