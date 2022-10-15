import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  constructor(
    private http: HttpClient,
) { }

  url = environment.serverUrl;
  token = localStorage.getItem('token');

  getIn(){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    const data = this.http.get(`${this.url}promoted-ads/info`,{headers}).toPromise();
    return data;
  }

  promocionados(){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    const data = this.http.get(`${this.url}ads/promoted-simple/byUser?type=vehicle`,{headers}).toPromise();
    return data;
  }

  primeraPaginaVehiculos(){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    const data = this.http.get(`${this.url}ads/promoted-front-page/byUser?type=vehicle`,{headers}).toPromise();
    return data;
  }
  primeraPaginaServicios(){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    const data = this.http.get(`${this.url}ads/promoted-front-page/byUser?type=service`,{headers}).toPromise();
    return data;
  }

  simpleVehiculos(){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    const data = this.http.get(`${this.url}ads/promoted-simple/byUser?type=vehicle`,{headers}).toPromise();
    return data;
  }
  simpleServicios(){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    const data = this.http.get(`${this.url}ads/promoted-simple/byUser?type=service`,{headers}).toPromise();
    return data;
  }


  deletePromocion(type:any, id:any){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    const data = this.http.delete(`${this.url}promoted-ads/${id}?type=${type}`,{headers}).toPromise();
    return data;
  }
}
