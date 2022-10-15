import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads/ads.service';
import { MechanicService } from 'src/app/services/ads/mechanic/mechanic.service';
import { ShopService } from 'src/app/services/ads/shop/shop.service';
import { AutosService } from 'src/app/services/ads/autos/autos.service';
import { Router } from '@angular/router';
import { TruckService } from 'src/app/services/ads/truck/truck.service';

@Component({
    selector: 'app-deseos',
    templateUrl: './deseos.component.html',
    styleUrls: ['./deseos.component.scss']
})
export class DeseosComponent implements OnInit {

    constructor(
        private AutosService:AutosService,
        private router: Router,
        private AdsService:AdsService,
        private MechanicService:MechanicService,
        private ShopService:ShopService,
        private TruckService:TruckService
    ) { }

    ngOnInit(): void {
        this.marks=JSON.parse(localStorage.getItem("marks") || '[]' )

        this.marks.forEach( (e:any) =>{
            console.log(e)
            // temp.data.filter( (dat) => {
            //     if(dat?.auto_ad != null){
            //         dat.auto_ad.ad.images = dat.images
            //         data.push(dat.auto_ad)
            //     }
            //     if(dat?.moto_ad != null){
            //         dat.moto_ad.ad.images = dat.images
            //         data.push(dat.moto_ad)
            //     }
            //     if(dat?.truck_ad != null){
            //         dat.moto_ad.ad.images = dat.images
            //         data.push(dat.moto_ad)
            //     }
            //     if(dat?.mobile_home_ad != null){
            //         dat.moto_ad.ad.images = dat.images
            //         data.push(dat.moto_ad)
            //     }
            // } );

            this.AdsService.GetById(e.id_ad).then(res=>{
                console.log(e.type)
                if(e.type == 'auto'){
                    res.data.auto_ad.ad.images = res.data.images
                    this.autos.push(res.data.auto_ad)
                }
                if(e.type == 'moto'){
                    res.data.moto_ad.ad.images = res.data.images
                    this.autos.push(res.data.moto_ad)
                }
                if(e.type == 'mobile-home'){
                    res.data.mobile_home_ad.ad.images = res.data.images
                    this.autos.push(res.data.mobile_home_ad)
                }
                if(e.type == 'shop'){
                    this.shop.push(res.data.shop_ad)
                }
                if(e.type == 'mechanic'){
                    this.mechanic.push(res.data)
                }
                console.log(res.data)
                // if(res.data.data.length>0){
                //     this.autos.push(res.data.data[0]);
                // }
            })
        })

    }


    marks:any=[]
    autos:any=[]
    mechanic:any=[]
    shop:any=[]
    menu:number=1;

    GoShow(info:any){
        // this.ShowVehicleService.SetInfo(info);
        if(info.type=='auto'){
            this.router.navigate(['compra/comprar'],{queryParams: { id: info.id, id_ad:info.auto_ad.ad_id }})
        }
        console.log(info)
    }

    GoPage(web:any){
        window.open(web, "_blank");
    }

    GoToWts(phone:any){
        if(phone){
            window.open('https://wa.me/'+phone, "_blank");
        }
    }

    CargarThumb(foto:any){
        if(foto.includes("http")){
            return foto
        }else{
            return 'https://cdn.autosmotos.es/'+foto
        }
    }

    onImgError(event:any){
        event.target.src = '../../../assets/img/logo.svg'
       //Do other stuff with the event.target
    }

    Vaciar(){
        localStorage.removeItem('marks')
    }

    SelectMark(item:any){
        let type="";
        let id="";
        let id_ad="";

        if(item?.type){
            type=item?.type;
            id=item?.id
            if(item?.type == 'auto'){
                id_ad=item?.auto_ad.id
            }
            if(item?.type == 'truck'){
                id_ad=item?.truck_ad.id
            }
            if(item?.type == 'mechanic'){
                id_ad=item?.mechanic_ad.id
            }
            if(item?.type == 'rental'){
                id_ad=item?.rental_ad.ad_id
            }
        }else{
            
            if(item?.ad?.type){
                type=item?.ad?.type;
                id=item?.id
                id_ad=item?.ad.id

            }else{
            }
        }

        if(this.marks.filter( (e:any)=>{
            return e.id_ad == id_ad 
        }).length > 0 ){
            this.marks.forEach(function (car: any, index: any, object: any) {
                if (car.id_ad == id_ad) {
                    object.splice(index, 1);
                }
            });

            this.autos.forEach(function (car: any, index: any, object: any) {
              
                if (car == item) {
                    object.splice(index, 1);
                }
            });
            localStorage.setItem('marks', JSON.stringify(this.marks));
        }
    }

    GetLength(ad:any){
        return ad.images.length
    }

    GetPrice(price:any){
        price = price.split('.')[0]
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        return price.toString().replace(exp,rep);
    }

    CargarThumbDealer(foto:any){
        if(foto){
            if(foto.includes("http")){
                return foto
            }else{
                return 'https://cdn.autosmotos.es/'+foto
            }
        }else{
            return '../../../assets/img/logo.svg'
        }
    }
}
