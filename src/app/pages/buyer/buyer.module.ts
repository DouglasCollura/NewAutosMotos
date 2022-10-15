import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { TalleresComponent } from './talleres/talleres.component';
import { AlquilerComponent } from './alquiler/alquiler.component';
import { RecambioComponent } from './recambio/recambio.component';
import { DeseosComponent } from './deseos/deseos.component';
import { DealersAdsComponent } from './dealers-ads/dealers-ads.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SwiperModule } from 'swiper/angular';
@NgModule({
    declarations: [
        BuyerComponent,
        TalleresComponent,
        AlquilerComponent,
        RecambioComponent,
        DeseosComponent,
        DealersAdsComponent,
    ],
    imports: [
        CommonModule,
        BuyerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SwiperModule,
    ]
})
export class BuyerModule { }
