import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiTiendaService {

  url = environment.serverUrl;
  token = localStorage.getItem('token')
  constructor(
    private http: HttpClient,
  ) { }

  // mi tienda
  async getMiTienda(id:any): Promise<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

     const response = await this.http.get(`${this.url}dealer-show-rooms/${id}/dealer`, {headers}).toPromise()
     return response;
  }

  async updateTienda(id:any, data:any): Promise<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

     const response = await this.http.post(`${this.url}dealer-show-rooms/${id}`,  data, {headers}).toPromise()
     return response;
  }


  // mi tienda
  async deleteAds(id:any): Promise<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

     const response = await this.http.delete(`${this.url}ads/${id}`, {headers}).toPromise()
     return response;
  }
}
