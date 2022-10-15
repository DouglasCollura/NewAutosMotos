import { Component, OnInit } from '@angular/core';
import { DealersService } from 'src/app/services/dealers/dealers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowVehicleService } from 'src/app/services/show_vehicle/show-vehicle.service';
declare var $: any;

@Component({
    selector: 'app-dealers-ads',
    templateUrl: './dealers-ads.component.html',
    styleUrls: ['./dealers-ads.component.scss']
})
export class DealersAdsComponent implements OnInit {

    constructor(
        private DealersService:DealersService,
        private router: Router,
        private rutaActiva: ActivatedRoute,
        private ShowVehicleService:ShowVehicleService,
    ) { }

    ngOnInit(): void {

        this.rutaActiva.params
        .subscribe((params:any) => {
            this.id = params.id
            if(params.id){
                this.GetVehiculos(params.id)
                this.DealersService.GetDealer(params.id).then((res:any)=>{
                    console.log("dealer")
                    this.dealer = res.data
                    console.log(res)
                })
            }
        })
    }

    dealer:any;
    vehiculos:any;
    recambios:any;
    marks:any=[];
    id:any
    menu:number=1;
    loading:boolean=false;
    total:number=0;

    GetVehiculos(id,page:number=1){
        this.menu = 1;
        this.loading=true;
        if(this.vehiculos?.current_page){
            this.vehiculos.current_page= page;
            this.vehiculos.data=[]
        }
        if(page ==1){
            this.total = 0;
        }
        this.DealersService.Get(id,'auto',page).then( (res:any)=>{
            let temp=res.data;
            let data=[]
            if(page ==1){
                this.total = res.data.total;
            }
            this.loading=false;
            temp.data.filter( (dat) => {
                if(dat?.auto_ad != null){
                    dat.auto_ad.ad.images = dat.images
                    data.push(dat.auto_ad)
                }
                if(dat?.moto_ad != null){
                    dat.moto_ad.ad.images = dat.images
                    data.push(dat.moto_ad)
                }
                if(dat?.truck_ad != null){
                    dat.truck_ad.ad.images = dat.images
                    data.push(dat.truck_ad)
                }
                if(dat?.mobile_home_ad != null){
                    dat.mobile_home_ad.ad.images = dat.images
                    data.push(dat.mobile_home_ad)
                }
            } );
            temp.data = data;
            this.vehiculos = temp
            console.log(this.vehiculos)

        })
    }


    GetRecambios(id,page:number=1){
        this.menu = 2;
        if(page ==1){
            this.total = 0;
        }
        this.loading = true;
        this.DealersService.Get(id,'shop',page).then( (res:any)=>{
            let temp=res.data;
            let data=[]
            if(page ==1){
                this.total = res.data.total;
            }
            console.log(res)
            this.loading = false;

        })
    }

    GetTalleres(id,page:number=1){
        this.menu = 3;
        if(page ==1){
            this.total = 0;
        }
        this.loading = true;

        this.DealersService.Get(id,'mechanic',page).then( (res:any)=>{
            let temp=res.data;
            let data=[]
            if(page ==1){
                this.total = res.data.total;
            }
            console.log(res)
            this.loading = false;
        })
    }

    GetAlquiler(id,page:number=1){
        this.menu = 4;
        if(page ==1){
            this.total = 0;
        }
        this.loading = true;
        this.DealersService.Get(id,'rental',page).then( (res:any)=>{
            let temp=res.data;
            let data=[]
            if(page ==1){
                this.total = res.data.total;
            }
            console.log(res)
            this.loading = false;
        })
    }

    //?GESTION============================================================

    GoShow(info:any){
        this.ShowVehicleService.SetInfo(info);
        this.router.navigate(['compra/comprar'],{queryParams: { id: info.id, id_ad:info.ad.id }})
    }

    CreateRoute(info:any){
        return { id: info.id, id_ad:info.ad.id }
    }


    GetThumb(photo:any){
        if(photo != null){
            if(photo.includes('http')){
                return photo;
            }else{
                return 'https://cdn.autosmotos.es/'+photo
            }
        }else{
            return '../../../assets/img/logo.svg'
        }
    }

    GoToWts(phone:any){
        if(phone){
            window.open('https://wa.me/'+phone, "_blank");
        }
    }


    //?CONTROL============================================================

    SelectMark(item:any, ev:any){
        console.log(item)
        let type="";
        let id="";
        let id_ad="";
        let marks=[];
        if(item?.type){
            type=item?.type;
            id=item?.id
            // console.log('type: ',item?.type)
            // console.log('id: ',item?.id)
            if(item?.type == 'auto'){
                id_ad=item?.auto_ad.id
                // console.log('id_ad',item?.auto_ad.id)
            }
            if(item?.type == 'truck'){
                id_ad=item?.truck_ad.id
                // console.log('id_ad',item?.truck_ad.id)
            }
            if(item?.type == 'mechanic'){
                id_ad=item?.mechanic_ad.id
                // console.log('id_ad',item?.mechanic_ad.id)
            }
        }else{
            
            if(item?.ad?.type){
                // console.log('type: ',item?.ad?.type)
                // console.log('id: ',item?.id)
                // console.log('id_ad',item?.ad.id)
                type=item?.ad?.type;
                id=item?.id
                id_ad=item?.ad.id

            }else{
                console.log("asd")
            }
        }

        console.log(type,id,id_ad)
        if(localStorage.getItem("marks")){
            marks=JSON.parse(localStorage.getItem("marks") || '{}' )
        }
        console.log("marks")
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
            this.marks=marks.filter((e:any)=>{ return e.type == type })

        }else{
            console.log($('#btn'+ev))
            $('#btn'+ev).removeClass('btn-bookmark').addClass('btn-bookmark-primary')
            marks.push({type:type,id:id,id_ad:id_ad})
            $(ev.target)
            console.log(marks)
            localStorage.setItem('marks', JSON.stringify(marks));
            this.marks=marks.filter((e:any)=>{ return e.type == type })
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

    onImgError(event:any){
        event.target.src = '../../../assets/img/logo.svg'
       //Do other stuff with the event.target
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
