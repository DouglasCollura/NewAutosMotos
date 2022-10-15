import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    Get(page:any,filtro:any): Promise<any> {
        const send = this.http.get(`${this.url}shop-ads?page=${page}&${filtro}`).toPromise()
        return send;
    }

    filter(filtro:any,page:any): Promise<any> {
        const send = this.http.post(`${this.url}shop-ads/search_advanced?page=${page}`,filtro).toPromise()
        return send;
    }
    
    FindSearch(filter:any,page:any=1): Promise<any> {
        const send = this.http.post(`${this.url}shop-ads/search?page=${page}`,filter).toPromise()
        return send;
    }
}
