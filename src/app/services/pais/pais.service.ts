import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PaisService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;

    Markets(){
        const send = this.http.get(`${this.url}markets`).toPromise()
        return send;
    }

}
