import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class VehiculosService {

    constructor(
        private http: HttpClient,

    ) { }

    url = environment.serverUrl;

    GetAutos(){
        const send = this.http.get(`${this.url}auto-ads?page=1`).toPromise()
        return send;
    }

    TypesFuel(type:any){
        const send = this.http.get(`${this.url}car-fuel-types?all=true&filters[ad_type]=${type}`).toPromise()
        return send;
    }

    TypesTransmision(type:any){
        const send = this.http.get(`${this.url}car-transmission-types?all=true&filters[ad_type]=${type}`).toPromise()
        return send;
    }

    TypesTraccion(type:any){
        const send = this.http.get(`${this.url}car-wheel-drive-types?all=true&filters[ad_type]=${type}`).toPromise()
        return send;
    }

    Carroceria(type:any){
        const send = this.http.get(`${this.url}car-body-types?all=true&filters[ad_type]=${type}`).toPromise()
        return send;
    }

    Categoria(type:any){
        const send = this.http.get(`${this.url}vehicle-categories/category?all=true&filters[ad_type]=${type}`).toPromise()
        return send;
    }

    SubCategoria(type:any){
        const send = this.http.get(`${this.url}vehicle-categories?all=true&filters[category]=${type}`).toPromise()
        return send;
    }

    
}
