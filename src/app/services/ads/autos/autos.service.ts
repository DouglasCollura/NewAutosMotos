import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AutosService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;
    
    GetAutos(filtro:any,page:any) {
        
        const send = this.http.get(`${this.url}auto-ads?page=${page}&${filtro}`).toPromise()
        return send;
    }
    

    GetById(id:string): Promise<any> {

        const send = this.http.get(`${this.url}auto-ads?filters[id]=${id}`).toPromise()
        return send;
    }

    Marcas(type:string): Promise<any> {

        const send = this.http.get(`${this.url}makes?orderBy=name&orderDirection=asc&filters[ad_type]=${type}&per_page=500`).toPromise()
        return send;
    }

    Modelos(id:any){
        const send = this.http.get(`${this.url}models?orderBy=name&orderDirection=asc&filters[make_id]=${id}&per_page=500`).toPromise()
        return send;
    }
    

    Pais(): Promise<any> {

        const send = this.http.get(`${this.url}markets`).toPromise()
        return send;
    }

}
