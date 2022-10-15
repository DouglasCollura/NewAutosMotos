import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiTiendaComponent } from '../mi-tienda/mi-tienda.component';
import { SwiperModule } from 'swiper/angular';
import { SellerLayoutComponent } from '../../layout/seller-layout/seller-layout.component';
import { ResenasComponent } from '../resenas/resenas.component';
import { ImportacionComponent } from '../importacion/importacion.component';
import { ImportacionConfirmComponent } from '../importacion-confirm/importacion-confirm.component';
import { ProcesoCompraComponent } from '../proceso-compra/proceso-compra.component';
import { VentaVehiculoComponent } from 'src/app/venta-vehiculo/venta-vehiculo.component';
import { SellVehicleComponent } from '../sell-vehicle/sell-vehicle.component';
import { PaymentsStepsComponent } from '../payments-steps/payments-steps.component';
import { StepOneComponent } from '../payments-steps/step-one/step-one.component';
import { StepThreeComponent } from '../payments-steps/step-three/step-three.component';
import { StepTwoComponent } from '../payments-steps/step-two/step-two.component';
import { TransferComponent } from '../transfer/transfer.component';
import { CompletePaymentComponent } from '../complete-payment/complete-payment.component';
import { PromocionesComponent } from '../promociones/promociones.component';

@NgModule({
  declarations: [
    SellerComponent,
    MiTiendaComponent,
    SellerLayoutComponent,
    ResenasComponent,
    ImportacionComponent,
    ImportacionConfirmComponent,
    ProcesoCompraComponent,
    VentaVehiculoComponent,
    SellVehicleComponent,
    TransferComponent,
    PaymentsStepsComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    CompletePaymentComponent,
    PromocionesComponent,
    
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    CarouselModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
  ],
  exports:[
  ]
})
export class SellerModule { }
