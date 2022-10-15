import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient,
    ) { }

    @Output() change: EventEmitter<any> = new EventEmitter();


    url = environment.serverUrl;
    token = localStorage.getItem('token');

    SignUp(datos:any){
        const send = this.http.post(`${this.url}users`,datos).toPromise()
        return send;
    }

    SignUpProf(datos:any){
        const send = this.http.post(`${this.url}users/professional`,datos).toPromise()
        return send;
    }

    LogIn(datos:any){
        const send = this.http.post(`${this.url}login`,datos).toPromise()
        return send;
    }

    SignUpDealer(datos:any){
        const send = this.http.post(`${this.url}dealers`,datos).toPromise()
        return send;
    }

    
    SignUpDealerShowRooms(datos:any){
        const send = this.http.post(`${this.url}dealer-show-rooms`,datos).toPromise()
        return send;
    }

    Recoverypass(datos:any,step:number){
        
        if(step == 1){
            const send = this.http.post(`${this.url}recovery-password-email`,datos).toPromise()
            return send;
        }
        else if(step == 2){
            const send = this.http.post(`${this.url}recovery-password-code`,datos).toPromise()
            return send;
        }else{
            const send = this.http.post(`${this.url}recovery-password`,datos).toPromise()
            return send;
        }
        
    }

    ValDealer(datos:any){
        const send = this.http.post(`${this.url}users/validator_company_name`,datos).toPromise()
        return send;
    }

    ValDealerShow(datos:any){
        const send = this.http.post(`${this.url}users/validator_dealer_show_room_name`,datos).toPromise()
        return send;
    }

    ValUser(datos:any){
        const send = this.http.post(`${this.url}users/validator_email`,datos).toPromise()
        return send;
    }


    change_img() {
        this.change.emit(true);
    }


    // ? PAGOS ++++

    Payment(plan:any){
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token
        });
      
        const send = this.http.get(`${this.url}plans/${plan}`, {headers}).toPromise()
        return send;
    }

    PaymentStripe(parametros:any){
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token
        });
      
        const send = this.http.post(`${this.url}stripe-payments`,parametros, {headers}).toPromise()
        return send;
    }

}
