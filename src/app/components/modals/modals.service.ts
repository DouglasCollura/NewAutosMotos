import { Injectable ,Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}
