import { Injectable ,Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalSuccessService {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() open: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  isOpen = false;

  // RECIBE INFORMACION Y ABRE EL MODAL, RECIBE TIPO Y TEXTO
  toggle(type:number, text:string, extra:number) {
    this.isOpen = !this.isOpen;
    this.change.emit({isOpen:this.isOpen, type:type, text:text, extra:extra});
  }

  // CIERRA EL MODAL
  onClose(){
    this.isOpen = !this.isOpen;
    this.close.emit(this.isOpen);
  }

  // ABRE EL MODAL
  onOpen(){
    this.isOpen = !this.isOpen;
    this.open.emit(this.isOpen);
  }
}
