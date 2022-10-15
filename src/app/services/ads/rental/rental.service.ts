import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RentalService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    Get(page:any,filtro:any): Promise<any> {
        const send = this.http.get(`${this.url}rental-ads?page=${page}&${filtro}`).toPromise()
        return send;
    }
}
