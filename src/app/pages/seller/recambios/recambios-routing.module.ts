import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecambiosComponent } from './recambios.component';

const routes: Routes = [
  {
    path: '',
    component: RecambiosComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecambiosRoutingModule { }
