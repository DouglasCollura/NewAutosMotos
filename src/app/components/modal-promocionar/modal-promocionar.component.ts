import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalSuccessService } from '../modals-success/modal-success.service';
import { ModalPromocionarService } from './modal-promocionar.service';

@Component({
  selector: 'app-modal-promocionar',
  templateUrl: './modal-promocionar.component.html',
  styleUrls: ['./modal-promocionar.component.scss']
})
export class ModalPromocionarComponent implements OnInit {

  @Output() success: EventEmitter<string> = new EventEmitter();

  constructor(
    private ModalPromocionarService:ModalPromocionarService,
    private ModalSuccessService:ModalSuccessService
  ){}
  
  modal=false;
  articulo='';
  anuncio:any=[];

  ngOnInit(): void {
    this.ModalPromocionarService.change.subscribe(res=>{
      this.modal = res.isOpen;
      this.articulo = res.articulo;
      this.anuncio = res.anuncio;
      this.loading1=true;
      this.loading2=true;
    })
    this.ModalPromocionarService.close.subscribe(close=>this.modal=close)
  }

  // CIERRA EL MODAL
  close(){
    this.ModalPromocionarService.onClose()
  }

  // EMITE RESPUESTA DE LA PROMOCION, RECIBE TEXTO 
  message='esto es una prueba del mensaje que se envia luego de promocionarse';

  loading1=true;
  loading2=true;

  async emiter(tipo){
    let obj = null;

    if(tipo === 1){
      this.loading1=false;
       obj = {
        ad_id: this.articulo,
        type:'simple'
      }
    }
    if(tipo === 2){
      this.loading2=false;
       obj = {
        ad_id: this.articulo,
        type:'front_page'
      }
    }

    await this.ModalPromocionarService.promocionar(obj)
    .then(res=>{
      console.log(res)
      this.ModalSuccessService.toggle(1, '¡Felicidades! Has promocionado el anuncio '+this.anuncio, 0)
      this.loading2=true;
      this.loading1=true;
    })
    .catch(error=>{
   
      this.ModalSuccessService.toggle(2, error.error?.error?.message?.data, 0)
      
      this.ModalPromocionarService.onClose();
      this.loading2=true;
      this.loading1=true;
    })
    this.close()
    // this.success.emit(this.message)
  }
}
