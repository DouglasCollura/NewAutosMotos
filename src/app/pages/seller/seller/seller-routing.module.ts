import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerComponent } from '../../buyer/buyer.component';
import { SellerComponent } from './seller.component';
import { SellerLayoutComponent } from '../../layout/seller-layout/seller-layout.component';
import { ResenasComponent } from '../resenas/resenas.component';
import { MiTiendaComponent } from '../mi-tienda/mi-tienda.component';
import { ImportacionComponent } from '../importacion/importacion.component';
import { ImportacionConfirmComponent } from '../importacion-confirm/importacion-confirm.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { PlanesComponent } from '../planes/planes.component';
// import { ProcesoCompraComponent } from '../proceso-compra/proceso-compra.component';
import { CompletePaymentComponent } from '../complete-payment/complete-payment.component';
import { PromocionesComponent } from '../promociones/promociones.component';
import { SellVehicleComponent } from '../sell-vehicle/sell-vehicle.component';
import { TransferComponent } from '../transfer/transfer.component';
import { PaymentsStepsComponent } from '../payments-steps/payments-steps.component';


const routes: Routes = [
    {
        path: '',
        component: SellerLayoutComponent,
        children:[
            {
                path:'',
                component: BuyerComponent
            },
            {
                path:'home',
                component: BuyerComponent
            },
            {
                path: 'inicio',
                component: SellerComponent
            },
            {
                path: 'anuncio',
                loadChildren: () => import('../anuncio/anuncio.module').then(m => m.AnuncioModule)
            },
            {
                path: 'anuncio/:id',
                loadChildren: () => import('../anuncio/anuncio.module').then(m => m.AnuncioModule)
            },
            {
                path: 'alquiler',
                loadChildren: () => import('../alquiler/alquiler.module').then(m => m.AlquilerModule)
                
            },
            {
                path: 'alquiler/:id',
                loadChildren: () => import('../alquiler/alquiler.module').then(m => m.AlquilerModule)
            },
            {
                path: 'recambios',
                loadChildren: () => import('../recambios/recambios.module').then(m => m.RecambiosModule)
            },
            {
                path: 'recambios/:id',
                loadChildren: () => import('../recambios/recambios.module').then(m => m.RecambiosModule)
            },
            {
                path: 'repuestos',
                loadChildren: () => import('../repuestos/repuestos.module').then(m => m.RepuestosModule)
            },
            {
                path: 'resenas',
                component: ResenasComponent
            },
            {
                path: 'tienda',
                component: MiTiendaComponent
            },
            {
                path: 'importar',
                component: ImportacionComponent
            },
            {
                path:'importacion-upload',
                component: ImportacionConfirmComponent
            },
            {
                path:'perfil',
                loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilModule)
            },
            {
                path:'planes',
                loadChildren: () => import('../planes/planes.module').then(m => m.PlanesModule)
            },
            {
                path:'planes/compra/:plan',
                component: PaymentsStepsComponent
            },
            {
                path:'planes/compra/confirmar/:plan',
                component: CompletePaymentComponent
            },
            {
                path:'planes/compra/transfer/:plan',
                component: TransferComponent
            },
            {
                path:'promociones',
                component: PromocionesComponent
            },
            {
                path:'sell-vehicle',
                component: SellVehicleComponent
            },
            {
                path:'sell-vehicle/:id',
                component: SellVehicleComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SellerRoutingModule { }
