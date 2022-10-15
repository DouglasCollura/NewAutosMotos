import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals/modals.component';
import { RouterModule } from '@angular/router';
import { ModalsSuccessComponent } from './modals-success/modals-success.component';
import { ModalEditTiendaComponent } from './modal-edit-tienda/modal-edit-tienda.component';
import { ModalPromocionarComponent } from './modal-promocionar/modal-promocionar.component';
import { ModalEditProfileComponent } from './modal-edit-profile/modal-edit-profile.component';
import { ModalHelpComponent } from './modal-help/modal-help.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';
import { ModalConfirmPlanComponent } from './modal-confirm-plan/modal-confirm-plan.component';
import { ModalConfirmationPromoComponent } from './modal-confirmation-promo/modal-confirmation-promo.component';

@NgModule({
  declarations: [
    ModalsComponent,
    ModalsSuccessComponent,
    ModalEditTiendaComponent,
    ModalPromocionarComponent,
    ModalEditProfileComponent,
    ModalHelpComponent,
    ModalConfirmationComponent,
    ModalConfirmPlanComponent,
    ModalConfirmationPromoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ModalsComponent,
    ModalsSuccessComponent,
    ModalEditTiendaComponent,
    ModalPromocionarComponent,
    ModalEditProfileComponent,
    ModalHelpComponent,
    ModalConfirmationComponent,
    ModalConfirmPlanComponent,
    ModalConfirmationPromoComponent
  ]
})
export class ComponentsModule { }
