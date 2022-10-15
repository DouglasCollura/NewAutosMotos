import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalConfirmationService } from './modal-confirmation.service';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

  @Output() success: EventEmitter<string> = new EventEmitter();

  constructor(
    private ModalConfirmationService:ModalConfirmationService
  ) { }

  modal=false;
  ngOnInit(): void {
    this.ModalConfirmationService.change.subscribe(res=>{
      this.modal = res;
    })
  }

  // CIERRA EL MODAL
  close(){
    this.ModalConfirmationService.toggle()
  }

  aceptar(){
      this.success.emit();
      this.close();
  }
}
