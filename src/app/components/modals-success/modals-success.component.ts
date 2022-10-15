import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalSuccessService } from './modal-success.service';

@Component({
  selector: 'app-modals-success',
  templateUrl: './modals-success.component.html',
  styleUrls: ['./modals-success.component.scss']
})
export class ModalsSuccessComponent implements OnInit {

  constructor(
    private ModalSuccessService:ModalSuccessService,
    private router:Router,
  ) { }

  modal=false;
  valor=0
  ngOnInit(): void {
    this.ModalSuccessService.change.subscribe(res=>{
      this.modal = res.isOpen
      this.type = res.type
      this.text = res.text;
      this.valor = res.extra;
    })
    this.ModalSuccessService.close.subscribe(close=> this.modal=close)
    this.ModalSuccessService.open.subscribe(open=> this.modal=open)
  }

  close(){
    this.ModalSuccessService.onClose()
  }
  close1(){
    this.ModalSuccessService.onClose()

    this.router.navigateByUrl('/seller/tienda')
  }
  close2(){
    this.ModalSuccessService.onClose()

    this.router.navigateByUrl('/seller/perfil')
  }

  text:String='';
  type:Number=0;

  tienda(){
    this.router.navigate(['/seller/tienda']);
    this.ModalSuccessService.onClose();
  }
}
