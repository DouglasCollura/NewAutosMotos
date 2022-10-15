import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepTwoServiceService {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() open: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  onClose(){
    this.close.emit(false)
  }
  onOpen(){
    this.open.emit(true)
  }
}
