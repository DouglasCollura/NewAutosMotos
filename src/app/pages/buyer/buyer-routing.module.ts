import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AlquilerComponent } from './alquiler/alquiler.component';
import { BuyerComponent } from './buyer.component';
import { DealersAdsComponent } from './dealers-ads/dealers-ads.component';
import { DeseosComponent } from './deseos/deseos.component';
import { RecambioComponent } from './recambio/recambio.component';
import { TalleresComponent } from './talleres/talleres.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path:'',
                component:BuyerComponent
            },
            
            {
                path: 'compra',
                loadChildren: () => import('./compra/compra.module').then(m => m.CompraModule)
            },
            {
                path: 'compra/type/:type',
                loadChildren: () => import('./compra/compra.module').then(m => m.CompraModule)
            },
            {
                path: 'compra/comprar',
                loadChildren: () => import('./comprar/comprar.module').then(m => m.ComprarModule)
            },
            
            {
                path: 'alquiler',
                component: AlquilerComponent
            },
            {
                path: 'deseos',
                component: DeseosComponent
            },
            {
                path: 'talleres',
                component: TalleresComponent
            },
            {
                path: 'recambio',
                component: RecambioComponent
            },
            {
                path: 'dealers/:id',
                component: DealersAdsComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuyerRoutingModule { }
