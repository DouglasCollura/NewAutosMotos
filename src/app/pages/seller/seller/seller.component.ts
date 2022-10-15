import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalsService } from 'src/app/components/modals/modals.service';
import { SellerService } from './seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

    constructor(
        private ModalsService:ModalsService,
        private SellerService:SellerService
    ) { }

    anuncios:any=[];
    resenas:any=[];
    
    async ngOnInit(){
        // obtener anuncios de vendedor
        await this.SellerService.getAnunciosPublicado()
        .then(response=>{
            console.log(response)
            this.anuncios = response.data;
        })
        // obtener resenas del vendedor
        await this.SellerService.getResenas()
        .then(response=>{
            console.log(response)
            this.resenas = response.data;
        })
    }

    customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true ,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
        0: {
            items: 1
        },
        400: {
        items: 2
        },
        740: {
        items: 3
        },
        940: {
        items: 4
        }
    },
    }
    customOptionsresena: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
            items: 2
            },
            740: {
            items: 3
            },
        },
    }

    modalOpen(){
        this.ModalsService.toggle()
    }

    subString(text:string){
        return text.substring(0, 45)
        // console.log(texto)
    }
}
