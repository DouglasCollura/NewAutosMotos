import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable ,Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalPromocionarService {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http:HttpClient
  ) { }

  isOpen = false;

  toggle(articulo:number, name:string) {
    this.isOpen = !this.isOpen;
    this.change.emit({isOpen:this.isOpen, articulo:articulo, anuncio:name});
  }

  onClose(){
    this.isOpen = !this.isOpen;
    this.close.emit(this.isOpen);
  }


  url = environment.serverUrl;
  token = localStorage.getItem('token');

  async promocionar(info){
    const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.token
    });
    const data = await this.http.post(`${this.url}promoted-ads`, info, {headers}).toPromise();
    return data;
  }
}
