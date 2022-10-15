import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalConfirmPlanService } from './modal-confirm-plan.service';

@Component({
  selector: 'app-modal-confirm-plan',
  templateUrl: './modal-confirm-plan.component.html',
  styleUrls: ['./modal-confirm-plan.component.scss']
})
export class ModalConfirmPlanComponent implements OnInit {

  @Output() success: EventEmitter<string> = new EventEmitter();

  constructor(
    private ModalConfirmPlanService:ModalConfirmPlanService
  ) { }

  modal=false;
  ngOnInit(): void {
    this.ModalConfirmPlanService.change.subscribe(res=>{
      this.modal = res;
    })
  }

  // CIERRA EL MODAL
  close(){
    this.ModalConfirmPlanService.toggle()
  }

  aceptar(){
      this.success.emit();
      this.close();
  }

}
