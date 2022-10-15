import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmationPromoService {

  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor() { }

  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}
