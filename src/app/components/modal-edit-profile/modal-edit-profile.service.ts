import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable ,Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalEditProfileService {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() run: EventEmitter<boolean> = new EventEmitter();

  url = environment.serverUrl;
  token = localStorage.getItem('token')
  constructor(
    private http: HttpClient,
  ) { }

  isOpen = false;

  // ABRE MODAL Y RECIBE INFORMACION DE LA TIENDA
  toggle(user:any) {
    this.isOpen = !this.isOpen;
    this.change.emit({isOpen:this.isOpen, user:user});
  }


  // ABRE Y CIERRA EL MODAL
  onRun(){
    this.isOpen = !this.isOpen;
    this.run.emit(this.isOpen)
  }


  async updateUser(data:any): Promise<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

     const response = await this.http.post(`${this.url}users/update_profile`,  data, {headers}).toPromise()
     return response;
  }
}
