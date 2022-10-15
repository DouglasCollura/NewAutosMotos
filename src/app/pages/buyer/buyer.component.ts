import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AutosService } from 'src/app/services/ads/autos/autos.service';
import { Router } from '@angular/router';
import { AdsService } from 'src/app/services/ads/ads.service';
import { MechanicService } from 'src/app/services/ads/mechanic/mechanic.service';
import { ShopService } from 'src/app/services/ads/shop/shop.service';
import { PaisService } from 'src/app/services/pais/pais.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

declare var $: any;
declare var Hammer: any;

@Component({
    selector: 'app-buyer',
    templateUrl: './buyer.component.html',
    styleUrls: ['./buyer.component.scss', './buyer-mobile.component.scss']
})
export class BuyerComponent implements OnInit, AfterViewInit {

    constructor(
        private AutosService:AutosService,
        private router: Router,
        private AdsService:AdsService,
        private MechanicService:MechanicService,
        private ShopService:ShopService,
        private PaisService:PaisService,

    ) { 
        var ua = navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|opera mobile|palmos|webos|Mobile|mobile|googlebot-mobile|CriOS/i.test(ua) || window.innerWidth <= 768)
        {
            this.mobile=true;

        }else{
            this.mobile=false;

        }
        // $("#select-lang").change(()=>{
        //     let lang =$("#select-lang option:selected").val()
        //     sessionStorage.setItem("lang",lang)
        //     if(lang == 'es|it'){
        //         this.banner = this.mobile? 'app-it.png':'web-it.png'
        //     }
        //     if(lang == 'es|ro'){
        //         this.banner = this.mobile? 'app-ro.png': 'web-ro.png'
        //     }
        //     if(lang == 'es|es'){
        //         this.banner = this.mobile? 'app-es.png':'web-es.png'
        //     }
        //     if(lang == 'es|de'){
        //         this.banner = this.mobile? 'app-ge.png':'web-ge.png'
        //     }
        //     if(lang == 'es|en'){
        //         this.banner =  this.mobile? 'app-en.png':'web-en.png'
        //     }
        // })
    }

    ngOnInit(): void {
        var ua = navigator.userAgent;
        $(window).resize(()=> {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|opera mobile|palmos|webos|Mobile|mobile|googlebot-mobile|CriOS/i.test(ua) || window.innerWidth <= 768)
            {
                this.mobile=true;

            }else{
                this.mobile=false;

            }
            this.SetBanner()
        });
        this.SetBanner()

        
    }

    async ngAfterViewInit() {
        this.AutosService.GetAutos('',1).then((res:any)=>{
            this.ads_auto = res.data.data;

            this.marks=JSON.parse(localStorage.getItem("marks") || '[]' )
            this.AdsService.GetUltimos().then((res:any)=>{
                this.ultimos = res.data.data;
                
                this.ShopService.Get(1,'').then(res=>{
                
                    this.recambios = res.data.data;
                })

            })
        })

        this.MechanicService.GetCarrusel().then(res=>{
            this.talleres = res.data.data
        })
        // this.MechanicService.Get().then(res=>{
            
        //     this.talleres = res.data.data;
        // })


        this.AutosService.Marcas(this.type == 'all'? 'auto':this.type).then(res=>{
            this.marcas = res.data.data;
        })

        this.AutosService.Pais().then(res=>{
            this.paises = res.data.data;
        })

        this.GetCount()
        
    
    }

    //!DATA===========================================================================================================
    //?CARGA=================================================================================
    ads_auto:any;
    marcas:any;
    modelos:any;
    paises:any=[];
    ultimos:any;
    talleres:any;
    recambios:any;
    //?GESTION=================================================================================
    type:string='all';
    marca:string="";
    modelo:any="";
    pais:any="";
    //?CONTROL=================================================================================
    marks:any=null;
    count:any;
    banner:string="web-es.png"
    mobile:boolean=false;

    option_toggle:boolean=false;
    sel_name_marca:string=null

    config: SwiperOptions = {
        navigation: true,
        spaceBetween:60,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween:90,
            },
            500: {
                slidesPerView: 2,
                spaceBetween:90,
            },
            850: {
                slidesPerView: 3,
                spaceBetween:90,
            },
            1000: {
                slidesPerView: 3,
                spaceBetween:110,
            },
            1300: {
                slidesPerView: 5,
                spaceBetween:90,

            },
        }
    };
    config2: SwiperOptions = {
        navigation: true,
        spaceBetween:60,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween:90,
            },
            620: {
                slidesPerView: 2,
                spaceBetween:90,
            },
            800: {
                slidesPerView: 3,
            },
            1000: {
                slidesPerView: 3,
                spaceBetween:100,
            },
            1300: {
                slidesPerView: 4,
                spaceBetween:110,

            },
        }
    };
    //!FUNCIONES===========================================================================================================
    //?CARGA=================================================================================
    GetCount(){
        this.count=null;
        this.AdsService.GetCount({type:this.type == 'auto'? 'all':this.type, make_id:this.marca, model_id:this.modelo, country: this.pais })
        .then(res=>{
            
            this.count=res.data

        })
    }


    //?GESTION=================================================================================

    ChangeType(type:string){
        this.type = type;
        this.marcas=[]
        this.GetCount()
        this.AutosService.Marcas(type).then(res=>{
            this.marcas = res.data.data;
        })
    }
    

    FiltrarModelo(){
        this.GetCount()
        console.log( this.marca )
        this.modelos=[]
        this.AutosService.Modelos(this.marca).then( (res:any)=>{
            this.modelos=res.data.data
        })
    }   

    Filtrar(){
        let fil=""
        if(this.type == 'all'){
            this.type = 'auto';
        }
        this.router.navigate(
            ['/compra'],
            {
                queryParams: { type: this.type, id_maker:this.marca, id_model:this.modelo, country: this.pais } 
            }
        );
    }

    GoPage(web:any){
        window.open(web, "_blank");
    }

    //?CONTROL=================================================================================
    moveRight(id:any){
        $('#'+id).animate({scrollLeft: $('#'+id).scrollLeft()+450},500)
    }

    moveLeft(id:any){
        $('#'+id).animate({scrollLeft: $('#'+id).scrollLeft()-450},500)
    }
    
    GoTo(route:string){
        // this.router.navigate([route])
        location.href=route
    }
    
    GoShow(id:any,id_ad:any){
        console.log(id)
        // this.ShowVehicleService.SetInfo(info);
        this.router.navigate(['compra/comprar'],{queryParams: { id: id, id_ad:id_ad }})
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

    CargarThumb(foto:any){
        if(foto != null){
            if(foto.includes("http")|| foto.includes("https")){
                return foto
            }else{
                return 'https://cdn.autosmotos.es/'+foto
            }
        }
        
    }

    GetPrice(price:any){
        price = price.split('.')[0]
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        return price.toString().replace(exp,rep);
    }

    CreateRoute(id:any,id_ad:any){
        return {  id: id, id_ad:id_ad  }
    }

    filterMark(id:any){
        if(this.marks){
            for (const key of this.marks) {
                if(key.id_ad == id){
                    return true
                }
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


    onImgError(event:any){
        event.target.src = '../../../assets/img/logo.svg'
       //Do other stuff with the event.target
    }

    SetBanner(){
        let lang =sessionStorage.getItem('lang')
        if(lang == 'es|it'){
            this.banner = this.mobile? 'app-it.png':'web-it.png'
        }
        if(lang == 'es|ro'){
            this.banner = this.mobile? 'app-ro.png':'web-ro.png'
        }
        if(lang == 'es|es'){
            this.banner =  this.mobile? 'app-es.png':'web-es.png'
        }
        if(lang == 'es|de'){
            this.banner =  this.mobile? 'app-ge.png':'web-ge.png'
        }
        if(lang == 'es|en'){
            this.banner =  this.mobile? 'app-en.png':'web-en.png'
        }
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
        if(ad?.images?.length){
            return ad?.images?.length
        }else{
            return 0
        }
    }

    CargarLogoMarca(marca:any){
        return 'https://www.auto-data.net/img/logos2/'+marca.name.replace(' ','_')+'.png'
    }


    SelectMarca(item:any){
        this.marca = item.id; 
        this.FiltrarModelo();
        this.option_toggle = !this.option_toggle;
        this.sel_name_marca = item.name
    }

    GoToDealer(id){
        this.router.navigate(['dealers/'+id])
    }

    MoveCar( e:any){
        var myElement:any = document.getElementById(e);
        var myContainer:any = document.getElementById('content-destacados');
        // create a simple instance
        // by default, it only adds horizontal recognizers
        var mc = new Hammer(myElement);

        // listen to events...
        mc.on("panright panleft ", function(ev) {
            // console.log("container")
            // console.log(myContainer.getBoundingClientRect())
            // console.log("content")
            // console.log(myElement.getBoundingClientRect())
            // console.log(-myElement.getBoundingClientRect().x)
            // console.log(-myElement.getBoundingClientRect().x+ev.deltaX)
            // const matrixValues = myElement..match(/matrix.*\((.+)\)/)[1].split(', ')
            // if (matrixType === '3d') {
            //     const x = matrixValues[12]
            //     const y = matrixValues[13]
            //     const z = matrixValues[14]
            // }
            if(ev.additionalEvent == 'panright'){
                if( (myContainer.getBoundingClientRect().x+20) > myElement.getBoundingClientRect().x ){
                    $(myElement).css({
                        'transform': 'translate3d(' + -myElement.getBoundingClientRect().x+ev.deltaX + 'px,0,0)'
                      });
                }
            }
            if(ev.additionalEvent == 'panleft'){
                $(myElement).css({
                    'transform': 'translate3d(' + ev.deltaX+ 'px,0,0)'
                });
                let x=myElement.style.transform.split('translate3d(')[1]
                console.log(x.split(','))
            }


        });
    }
}
