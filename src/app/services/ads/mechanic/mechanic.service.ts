import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MechanicService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    Get(page:any,filtro:any): Promise<any> {

        const send = this.http.get(`${this.url}mechanic-ads?page=${page}&${filtro}`).toPromise()
        return send;
    }

    GetCarrusel(): Promise<any> {
        const send = this.http.get(`${this.url}mechanic-ads?orderBy=created_at&orderDirection=desc&per_page=15`).toPromise()
        return send;
    }

    FindSearch(filter:any,page:any=1): Promise<any> {
        const send = this.http.post(`${this.url}mechanic-ads/search/like?page=${page}`,filter).toPromise()
        return send;
    }
}
