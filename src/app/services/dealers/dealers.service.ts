import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DealersService {

    constructor(
        private http: HttpClient,
    ) { }

    url = environment.serverUrl;


    GetDealer(dealer_id){
        const send = this.http.get(`${this.url}dealers/${dealer_id}`).toPromise()
        return send;
    }

    Get(dealer_id, tipo,page){
        const send = this.http.get(`${this.url}ads/byDealer/${dealer_id}?filter=${tipo}&page=${page}`).toPromise()
        return send;
    }
}
