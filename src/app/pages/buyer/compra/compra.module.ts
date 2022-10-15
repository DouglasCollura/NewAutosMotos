import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompraComponent } from './compra.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CompraRoutingModule } from './compra-routing.module';


@NgModule({
  declarations: [
    CompraComponent,
  ],
  imports: [
    CommonModule,
    CompraRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CompraModule { }
