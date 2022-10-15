import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TruckService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    Get(filtro:any,page:any): Promise<any> {

        const send = this.http.get(`${this.url}truck-ads?page=${page}&${filtro}`).toPromise()
        return send;
    }

    GetById(id:string): Promise<any> {

        const send = this.http.get(`${this.url}truck-ads?filter[ad_id]=${id}`).toPromise()
        return send;
    }

    Filtro(filtro:any): Promise<any> {

        const send = this.http.post(`${this.url}ads/filter`,filtro).toPromise()
        return send;
    }
}
