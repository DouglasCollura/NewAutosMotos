import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShowVehicleService {

    constructor() { }

    public info:any;

    SetInfo(info:any){
        this.info = info;
    }

}
