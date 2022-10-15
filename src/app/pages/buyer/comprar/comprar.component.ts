import { Component, OnInit } from '@angular/core';
import { ShowVehicleService } from 'src/app/services/show_vehicle/show-vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AutosService } from 'src/app/services/ads/autos/autos.service';
import { AdsService } from 'src/app/services/ads/ads.service';
import {Location} from '@angular/common';
import { VacioU } from 'src/assets/script/general';

declare var $: any;


@Component({
    selector: 'app-comprar',
    templateUrl: './comprar.component.html',
    styleUrls: ['./comprar.component.scss','./comprar-mobile.component.scss']
})
export class ComprarComponent implements OnInit {

    constructor(
        private ShowVehicleService: ShowVehicleService,
        private rutaActiva: ActivatedRoute,
        private AutosService:AutosService,
        private AdsService:AdsService,
        private _location: Location,
        private router: Router,
    ) { 
        this.loading=true;
    }

    ngOnInit(): void {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });


        if(localStorage.getItem('token')){
            this.CanRev=true;
        }
        this.marks=JSON.parse(localStorage.getItem("marks") || '[]' )

        this.rutaActiva.queryParams
        .subscribe((params:any) => {
            console.log(params); // { order: "popular" }
            if(params.id){
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                this.AdsService.GetById(params.id_ad).then(res=>{
                    console.log(res.data)
                    this.imagenes=res.data.images;
                    console.log(this.imagenes)
                    this.loading=false;

                    this.image_select=this.CargarThumb(this.imagenes[0]?.path);
                    this.ads = res.data;

                    if(this.ads.type=='auto' || this.ads.type=='AUTO'){
                        this.vehiculo = this.ads.auto_ad;
                        this.filter.type='auto'
                        console.log("vehiculo")
                        console.log(this.vehiculo)
                    }
                    if(this.ads.type=='moto' || this.ads.type=='MOTO'){
                        this.vehiculo = this.ads.moto_ad;
                        this.filter.type='moto'

                    }
                    if(this.ads.type=='mobile-home' || this.ads.type=='MOBIlE-HOME'){
                        this.vehiculo = this.ads.mobile_home_ad;
                        this.filter.type='mobile-home'

                    }
                    if(this.ads.type=='truck' || this.ads.type=='TRUCK'){
                        this.vehiculo = this.ads.truck_ad;
                        this.filter.type='truck'
                    }
                    if(this.ads.type=='shop' || this.ads.type=='SHOP'){
                        this.vehiculo = this.ads.shop_ad;
                        this.filter.type='shop'

                    }

                    

                    this.filter.make_id=this.vehiculo?.make?.id

                    this.Filtrar()
                    this.review.ad_id = params.id_ad
                    this.AdsService.GetReviews(params.id_ad).then(res=>{
                        console.log("res")
                        console.log(res)
                        this.reviews=res.data
                    })
                    
                })
                // this.AutosService.GetById(params.id).then(res=>{

                //     this.vehiculo = res.data.data[0];

                //     this.AdsService.GetById(params.id_ad).then(res=>{

                //         this.ads = res.data.data[0];
                //         this.imagenes = this.ads.images
                //         this.image_select =  this.CargarThumb(this.imagenes[0].path)
                //     })
                // })

            }
        })

    }



    vehiculo: any;
    anuncios:any;
    ads:any
    imagenes:any;
    image_select:any;
    index:number=0;
    geo:any={
        lat:null,
        lng:null
    }

    reviews:any;

    review:any={
        ad_id:null,
        testimony:null,
        name:null,
        score:1.00
    }

    filter:any={
        type:null,
        make_id:null,
    }
    marks:any;
    CanRev:boolean=false;
    loading:boolean=false;
    load_rev:boolean=false;
    load_rel:boolean=false;
    // !FUNCTION #################################################################

    // ?CARGA #################################################################



    // ?GESTION #################################################################

    SelectImg(ev:any){
        this.index = ev;
        $(".filter").css('display','none')
        console.log(this.index)
        let img = $('#'+ev).find('img')[0].src
       $('#'+ev).find('.filter').css('display','block')
        console.log(img)
        this.image_select = img
    }


    CargarThumb(foto:any){
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

    imgRight(){

        console.log(this.index)
        console.log("this.imagenes.lengt")
        console.log(this.imagenes.length)

        if(this.index< this.imagenes.length-1){
            $(".filter").css('display','none')

            this.index +=1;
            console.log(this.index)
            $('#'+this.index).find('.filter').css('display','block')
            let img = $('#'+(this.index)).find('img')[0];
            this.image_select = img.src;
            console.log(img.src)
        }
    }

    imgLeft(){
        console.log(this.index)
        console.log(this.imagenes.length)

        if(this.index>= 1){
            $(".filter").css('display','none')

            this.index -=1;
            console.log(this.index)
            $('#'+this.index).find('.filter').css('display','block')
            let img = $('#'+(this.index)).find('img')[0];
            this.image_select = img.src;
            console.log(img.src)
        }
    }

    GoToWts(phone:any){
        if(phone){
            window.open('https://wa.me/'+phone, "_blank");
        }
    }

    GoToCall(phone:any){
        if(phone){
            window.open('tel:'+phone);
        }
    }

    GoToMap(){
        window.open('https://maps.google.fr/maps?saddr='+this.vehiculo.latitude+','+this.vehiculo.longitude);
    }

    EnviarReview(){
        this.load_rev=true;

        this.AdsService.SendReview(this.review).then(res=>{
            console.log(res)
            this.reviews.data.push({name:this.review.name,score:this.review.score,testimony:this.review.testimony})
            this.load_rev=false
            this.review.name=null;
            this.review.testimony=null;
            this.review.score=1.00;
        })
        
        // this.reviews.data.data.slice().reverse().push(this.review)
    }


    // ?CONTROL #################################################################

    moveRight(id:any){
        $('#'+id).animate({scrollLeft: $('#'+id).scrollLeft()+450},500)
    }

    moveLeft(id:any){
        $('#'+id).animate({scrollLeft: $('#'+id).scrollLeft()-450},500)
    }
    
    CanReview(){
        if(
            VacioU(this.review.name) ||
            VacioU(this.review.testimony)
        ){
            return false;
        }else{
            return true;
        }
    }

    Puntuar(event:any, point, enter){
        // if(enter){
        //     event.target.src = '../../../assets/img/star-red.svg'
        // }else{
        //     event.target.src = '../../../assets/img/star-blue.svg'
        // }
        this.review.score=point
    }

    backClicked() {
        this._location.back();
    }

    onImgError(event:any){
        event.target.src = '../../../assets/img/logo.svg'
       //Do other stuff with the event.target
    }
    

    GetThumb(photo:any){
        if(photo != null){
            if(photo.includes('http')){
                return photo;
            }else{
                return 'https://cdn.autosmotos.es/'+photo
            }
        }
    }

    GoShow(info:any){
        this.loading=true;
        this.ShowVehicleService.SetInfo(info);
        this.router.navigate(['compra/comprar'],{queryParams: { id: info.id, id_ad:info.ad.id }})
    }

    GoDealer(){
        this.router.navigate(['dealers/'+this.vehiculo.dealer.id])
    }

    filterMark(id:any){
        for (const key of this.marks) {
            if(key.id_ad == id){
                return true
            }
        }
        return false;
    }

    SelectMark(item:any, ev:any){
        console.log(item)
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
                console.log("asd")
            }
        }
        console.log("item")
        console.log(id_ad)

        if(this.marks.filter( (e:any)=>{
            return e.id_ad == id_ad 
        }).length > 0 ){
            console.log("asd")
            this.marks.forEach(function (car: any, index: any, object: any) {
                if (car.id_ad == id_ad) {
                    object.splice(index, 1);
                    console.log("del")
                }
            });
            localStorage.removeItem('marks');
            localStorage.setItem('marks', JSON.stringify(this.marks));
        }else{
            $(ev).removeClass('btn-bookmark').addClass('btn-bookmark-primary')

            this.marks.push({type:type,id:id,id_ad:id_ad})
            localStorage.setItem('marks', JSON.stringify(this.marks));
            
        }
    }

    GetPrice(price:any){
        if(price){
            price = price.split('.')[0]
            const exp = /(\d)(?=(\d{3})+(?!\d))/g;
            const rep = '$1,';
            return price.toString().replace(exp,rep);
        }
    }


    Filtrar(){
        this.load_rel=true;
        this.anuncios=[]
        
        this.AdsService.filter(this.filter,1).then(res=>{
            
            this.anuncios=[]
            console.log(res.data.data)
            this.anuncios = res.data;
            this.load_rel=false;
            // this.GetMarcas()
        })
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

    GetLength(ad:any){
        return ad.images.length
    }

}
