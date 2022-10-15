import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ShopService } from 'src/app/services/ads/shop/shop.service';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { AdsService } from 'src/app/services/ads/ads.service';
import {SoloNumero, SoloLetra} from '../../../../assets/script/general'

@Component({
    selector: 'app-recambio',
    templateUrl: './recambio.component.html',
    styleUrls: ['./recambio.component.scss','./recambio-mobile.component.scss']
})
export class RecambioComponent implements OnInit {

    constructor(
        private ShopService:ShopService,
        private router: Router,
        private rutaActiva: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private AdsService:AdsService,

    ) { 
        var ua = navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|opera mobile|palmos|webos|Mobile|mobile|googlebot-mobile|CriOS/i.test(ua) || window.innerWidth <= 768)
        {
            this.mobile=true;
            this.display_filter=false

        }else{
            this.mobile=false;
            this.display_filter=true

        }
    }

    ngOnInit(): void {

        var ua = navigator.userAgent;
        $(window).resize(()=> {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|opera mobile|palmos|webos|Mobile|mobile|googlebot-mobile|CriOS/i.test(ua) || window.innerWidth <= 768)
            {
                this.mobile=true;
                this.display_filter=false

            }else{
                this.mobile=false;
                this.display_filter=true

            }
        });

        $( ()=>{
            // $(document).on( 'scroll',  (e:any)=>{
            //     this.Scroll(e)
            //     this.ref.detectChanges()

            // })
        })
        let marks=JSON.parse(localStorage.getItem("marks") || '[]' )
        this.marks=marks.filter((e:any)=>{ return e.type == 'shop' })
        this.search_bar.type='shop';
        this.Get('',1)
    }

    //?CARGA===================================================================================
    shops:any=[];
    search_bar:any={
        filter:null,
    }

    filter:any={
        category:'auto',
        make_id:null,
        country:null,
        from_price:500,
        to_price:5000000
    }
    page:number=0

    mobile:boolean=false;
    display_filter:boolean=false;

    //?GESTION===================================================================================

    
    Search(){
        this.ShopService.FindSearch(this.search_bar).then(res=>{
            console.log(res)
        })
    }

    Filtrar(page:number){
        this.loading=true;
        this.filter.category=[this.filter.category]

        if(this.page == 0){
            this.shops=[]
        }
        if(this.mobile){
            this.display_filter = false;
        }
        this.ShopService.filter(this.filter,page).then(res=>{

            if(page == 0){
                console.log(res.data.data)
                this.shops = res.data;

                // this.AdsService.GetCount(this.filter).then(res=>{
                //     console.log("COUNT")
                //     console.log(res.data)
                //     this.count = res.data
                // })
            }else{
                for (const property of res.data) {
                    this.shops.data.push(property)
                }
            }
            
            this.loading=false;
            // this.GetMarcas()
        })

        
    }

    //?CONTROL===================================================================================
    marks:any;
    loading:boolean=false;

    Get(filter:any,page:any){
        this.loading=true;

        this.shops.data=[]
        this.ShopService.Get(page,filter).then(res=>{
            console.log(res.data)
            this.shops=res.data
            this.loading=false;
            this.ref.detectChanges()

        })
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

    SelectMark(item:any, ev:any){
        console.log(item)
        let type="";
        let id="";
        let id_ad="";
        let marks=[];

        type=item?.ad.type;
        id=item?.ad.id
        id_ad=item?.ad_id

        console.log(type,id,id_ad)
        if(localStorage.getItem("marks")){
            marks=JSON.parse(localStorage.getItem("marks") || '[]' )
        }

        if(marks.filter( (e:any)=>{
            return e.id_ad == id_ad 
        }).length > 0 ){
            console.log("asd")
            marks.forEach(function (car: any, index: any, object: any) {
                
                if (car.id_ad == id_ad) {
                    object.splice(index, 1);
                    console.log(car.id_ad)
                    console.log(id_ad)
                    $('#btn'+ev).removeClass('btn-bookmark-primary').addClass('btn-bookmark')
                }
            });
            localStorage.setItem('marks', JSON.stringify(marks));
            this.marks=marks.filter((e:any)=>{ return e.type == 'shop' })
        }else{
        
            console.log($('#btn'+ev))
            $('#btn'+ev).removeClass('btn-bookmark').addClass('btn-bookmark-primary')
            marks.push({type:type,id:id,id_ad:id_ad})
            $(ev.target)
            console.log(marks)
            localStorage.setItem('marks', JSON.stringify(marks));
            this.marks=marks.filter((e:any)=>{ return e.type == 'shop' })
        }
        
    }

    filterMark(id:any){
        for (const key of this.marks) {

            if(key.id_ad == id){
                return true
            }
        }
        return false;
    }

    GoToWts(phone:any){
        window.open('https://api.whatsapp.com/send?phone='+phone, "_blank");
    }

    GoToCall(phone:any){
        window.open('https://tel:'+phone, "_blank");
    }

    GoShow(info:any){
        // this.ShowVehicleService.SetInfo(info);
        this.router.navigate(['compra/comprar'],{queryParams: { id: info.id, id_ad:info.ad.id }})
    }


    onImgError(event:any){
        event.target.src = '../../../assets/img/logo.svg'
       //Do other stuff with the event.target
    }


    OrderBy(tipo:any,fase:number){
        console.log(tipo)
        let order="";
        if(tipo == 'hightprice'){
            order='orderBy=price&orderDirection=desc&'
  
        }
        if(tipo == 'lowprice'){
            order='orderBy=price&orderDirection=asc&'

        }
        if(tipo == 'created_old'){
            order='orderBy=created_at&orderDirection=asc&'

        }
        if(tipo == 'created_new'){
            order='orderBy=created_at&orderDirection=desc&'

        }
        this.shops=[]
        this.Get(order,1)

    }


    // Scroll(e:any){
    //     var elem = $('html');
    //     // console.log("###################")
    //     // console.log(elem[0].scrollHeight- elem.scrollTop()-300)
    //     // console.log(elem.scrollTop())
    //     // console.log(elem.outerHeight())
    //     // console.log(elem[0].all[0].scrollHeight - elem.scrollTop())

    //     if ( ( (elem[0].scrollHeight - elem.scrollTop())-300) <= elem.outerHeight()) {
    //         if(this.shops?.next_page_url != null && this.loading == false){
    //             this.loading=true;
    //             this.Get('')
    //         }
    //         this.shops.next_page_url =null;
    //     }
    // }


    dropDown(id:any){
        if($("#"+id).hasClass("down") ){
            $("#"+id).removeClass("down")
        }else{
            $("#"+id).addClass("down")
        }
    }


    PintarRango(tipo:any){
        
        if(tipo == 'price'){
            if(this.filter.from_price > this.filter.to_price){
                this.filter.from_price = this.filter.to_price-1
            }
            if(this.filter.from_price < 500){
                this.filter.from_price = 500
            }
            if(this.filter.to_price > 5000000){
                this.filter.to_price = 5000000
            }
            let val1= ( (this.filter.from_price -500) / (5000000-500)) *100;
            let val2= ( (this.filter.to_price-500) /(5000000-500)) *100;
            $("#line-precio").css('background', 'linear-gradient( to right, #DFDFDF '+(val1)+'%'+', #ED1C24 '+(val1)+'%'+', #ED1C24 '+val2+'%'+', #DFDFDF '+val2+'%'+')');
        }
    }

    SoloNumero(e:any){
        return SoloNumero(e)
    }

    LimpiarFiltro(){
        this.filter.country=null;
        this.filter.city=null;
        this.filter.category="auto";
        this.filter.from_price=500;
        this.filter.to_price=5000000;
        this.shops=[]
        this.PintarRango('price')
        this.Get('',1)
    }

    GetPrice(price:any){
        price = price.split('.')[0]
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        return price.toString().replace(exp,rep);
    }

    pageChanged(ev){
        console.log(ev)
        this.shops.current_page = ev;
        this.Get(this.filter,ev)
    }

}
