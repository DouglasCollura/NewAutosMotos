import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupProfComponent } from './signup-prof.component';

const routes: Routes = [
  {
    path: '',
    component: SignupProfComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupProfRoutingModule { }
