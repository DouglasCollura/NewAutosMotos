import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  url = environment.serverUrl;
  token = localStorage.getItem('token')
  constructor(
    private http: HttpClient,
  ) { }


  // obtener anuncios del usuario
  async getAnunciosPublicado(): Promise<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

     const response = await this.http.get(`${this.url}ads/byUser`, {headers}).toPromise()
     return response;
  }

   // obtener anuncios del usuario
   async getRecambiosPublicado(): Promise<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

     const response = await this.http.get(`${this.url}ads/byUser?filter=shop`, {headers}).toPromise()
     return response;
  }

  // obtener reseñas del usuario
  async getResenas(): Promise<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

     const response = await this.http.get(`${this.url}reviews/byUser`, {headers}).toPromise()
     return response;
  }

  // obtiene los servicios publicados 
  async getServices(param:string): Promise<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

     const response = await this.http.get(`${this.url}ads/byUser?filter=${param}`, {headers}).toPromise()
     return response;
  }
}
