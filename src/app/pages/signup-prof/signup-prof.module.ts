import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { SignupProfRoutingModule } from './signup-prof-routing.module';
import {SignupProfComponent } from './signup-prof.component'

@NgModule({
  declarations: [
    SignupProfComponent
  ],
  imports: [
    CommonModule,
    SignupProfRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SignupProfModule { }
