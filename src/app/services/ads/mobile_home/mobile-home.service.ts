import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MobileHomeService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    GetMobile(filtro:any,page:any): Promise<any> {
        const send = this.http.get(`${this.url}mobile-home-ads?page=${page}&${filtro}`).toPromise()
        return send;
    }
}
