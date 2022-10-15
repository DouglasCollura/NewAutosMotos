import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryPassComponent } from './pages/recovery-pass/recovery-pass.component';

const routes: Routes = [
 
  {
    path: 'home',
    redirectTo:''
  },
  {
    path: '',
    loadChildren: () => import('./pages/buyer/buyer.module').then(m => m.BuyerModule)
  },
  {
    path: 'landing',
    component:LandingComponent
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'signup_pro',
    loadChildren: () => import('./pages/signup-prof/signup-prof.module').then(m => m.SignupProfModule)
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'recovery',
    component:RecoveryPassComponent
  },
  {
    path: 'seller',
    loadChildren: () => import('./pages/seller/seller/seller.module').then(m => m.SellerModule)
  },
  {
    path: 'terminos',
    loadChildren: () => import('./pages/docs/terminos/terminos.module').then(m => m.TerminosModule)
  },
  {
    path: 'politicas',
    loadChildren: () => import('./pages/docs/politicas/politicas.module').then(m => m.PoliticasModule)
  },
  {
    path: 'cookies',
    loadChildren: () => import('./pages/docs/cookies/cookies.module').then(m => m.CookiesModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
