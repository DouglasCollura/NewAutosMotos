import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmationService {

  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor() { }

  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}
