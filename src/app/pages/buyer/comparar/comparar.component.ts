import { Component, OnInit } from '@angular/core';
import { CompararService } from 'src/app/services/comparar/comparar.service';

@Component({
    selector: 'app-comparar',
    templateUrl: './comparar.component.html',
    styleUrls: ['./comparar.component.scss']
})
export class CompararComponent implements OnInit {

    constructor(
        private CompararService:CompararService
    ) { }

    ngOnInit(): void {
        this.CompararService.change.subscribe(res => {
            console.log("asd")
            this.Display = res.isOpen;
            this.vehiculos=[]
            this.vehiculos = this.CompararService.vehiculos
        })
    }
    
    Display:boolean=false;
    vehiculos:any=[]

    Close(){
        this.CompararService.toggle()
    }

    Reestablecer(){
        this.vehiculos=[];
        this.CompararService.limpar()
        this.CompararService.toggle()
    }

    CargarThumb(foto:any){
        if(foto.includes("http")){
            return foto
        }else{
            return 'https://cdn.autosmotos.es/'+foto
        }
    }

    GetPrice(price:any){
        price = price.split('.')[0]
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        return price.toString().replace(exp,rep);
    }

}
