import { Injectable ,Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalHelpService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();


  isOpen = false;
  constructor() { }

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}
