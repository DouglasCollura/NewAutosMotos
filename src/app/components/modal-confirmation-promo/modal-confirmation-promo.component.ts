import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ModalConfirmationPromoService} from './modal-confirmation-promo.service';
@Component({
  selector: 'app-modal-confirmation-promo',
  templateUrl: './modal-confirmation-promo.component.html',
  styleUrls: ['./modal-confirmation-promo.component.scss']
})
export class ModalConfirmationPromoComponent implements OnInit {

  @Output() success: EventEmitter<string> = new EventEmitter();

  constructor(
    private ModalConfirmationPromoService:ModalConfirmationPromoService
  ) { }

  modal=false;
  ngOnInit(): void {
    this.ModalConfirmationPromoService.change.subscribe(res=>{
      this.modal = res;
    })
  }

  // CIERRA EL MODAL
  close(){
    this.ModalConfirmationPromoService.toggle()
  }

  aceptar(){
      this.success.emit();
      this.close();
  }

}
