import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CompararService } from 'src/app/services/comparar/comparar.service';
import { ShowVehicleService } from 'src/app/services/show_vehicle/show-vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TruckService } from 'src/app/services/ads/truck/truck.service';
import { AutosService } from 'src/app/services/ads/autos/autos.service';
import { VacioU } from 'src/assets/script/general';
import { AdsService } from 'src/app/services/ads/ads.service';
import { MotoService } from 'src/app/services/ads/moto/moto.service';
import { MobileHomeService } from 'src/app/services/ads/mobile_home/mobile-home.service';
import { VehiculosService } from 'src/app/services/vehiculos/vehiculos.service';
import {SoloNumero, SoloLetra} from '../../../../assets/script/general'

// ! ASSETS ============================================
declare var $: any;
@Component({
    selector: 'app-compra',
    templateUrl: './compra.component.html',
    styleUrls: ['./compra.component.scss','./compra-mobile.component.scss']
})
export class CompraComponent implements OnInit {

    constructor(
        private CompararService:CompararService,
        private ShowVehicleService:ShowVehicleService,
        private router: Router,
        private rutaActiva: ActivatedRoute,
        private TruckService:TruckService,
        private AutosService:AutosService,
        private AdsService:AdsService,
        private MotoService:MotoService,
        private ref: ChangeDetectorRef,
        private MobileHomeService:MobileHomeService,
        private VehiculosService:VehiculosService,
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

    async ngAfterViewInit() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

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
            $(document).on( 'scroll',  (e:any)=>{
                this.Scroll(e)
            })

        })
        
        $( document ).on("input","#rango-distancia-min",()=>{
            if($( "#rango-distancia-min" ).val() - $( "#rango-distancia-max" ).val() >= 0){
                $( "#rango-distancia-min" ).val($( "#rango-distancia-max" ).val()) 
                this.filter.from_mileage = $( "#rango-distancia-min" ).val()
            }
        });

        $( document ).on("input","#rango-distancia-max",()=>{
            if($( "#rango-distancia-max" ).val() - $( "#rango-distancia-min" ).val() <= 0){
                $( "#rango-distancia-max" ).val($( "#rango-distancia-min" ).val()) 
                this.filter.to_mileage = $( "#rango-distancia-max" ).val()
            }
        })

        $( document ).on("input","#rango-precio-min",()=>{
            if($( "#rango-precio-min" ).val() - $( "#rango-precio-max" ).val() >= 0){
                $( "#rango-precio-min" ).val($( "#rango-precio-max" ).val()) 
                this.filter.from_price = $( "#rango-precio-min" ).val()
            }
        });

        $( document ).on("input","#rango-precio-max",()=>{
            if($( "#rango-precio-max" ).val() - $( "#rango-precio-min" ).val() <= 0){
                $( "#rango-precio-max" ).val($( "#rango-precio-min" ).val()) 
                this.filter.to_price = $( "#rango-precio-max" ).val()
            }
        })

        this.length_comparar = this.CompararService.vehiculos.length

        this.CompararService.arr.subscribe(()=>{
            this.length_comparar = 0;
            console.log($('.card-carousel-top-img').find('.btn-primary').removeClass('btn-primary').addClass('btn'))
        })

        this.rutaActiva.queryParams
        .subscribe((params:any) => {
            console.log(params); // { order: "popular" }

            if(!VacioU(params.id_maker)){
                this.filter.make_id=params.id_maker
            }
            if(!VacioU(params.id_model)){
                this.filter.model_id=params.id_model
            }
            if(!VacioU(params.country)){
                this.filter.country=params.country
            }
            if(!VacioU(params.orderby)){
                this.filter+='orderBy=created_at&orderDirection=desc&'
            }

            let marks=JSON.parse(localStorage.getItem("marks") || '[]' )

            if(params.search){
                this.marks=marks.filter((e:any)=>{ return e.type == 'auto' })
                this.filter.type='auto'
                this.search_bar.type = 'auto'
                this.types_fil.type='auto';
                this.searchall.filter=params.search
                this.GetMarcas()
                this.SearchAll(1)
            }else{
                if(params.type){
                    this.marks=marks.filter((e:any)=>{ return e.type == params.type })
                    this.filter.type=params.type
                    this.search_bar.type = params.type
                    this.types_fil.type=params.type;
                    this.GetMarcas()
                    this.Filtrar(1)
                    
                  
    
                    this.GetTypeFuel()
                    this.GetTypesTransmision()
                    this.GetTypesTraccion()
                    this.GetCarroceria()
    
                    if(this.filter.type !='auto'){
                        this.GetCategoria()
                    }
                    if(this.filter.type =='mobile-home'){
                        this.sel_category_name='Mobile home'
                        this.GetSubCategoria()
                    }
                }
            }

       
        })

    }

    
    //!DATA=====================================================================
    //?CARGA===================================================================================
    res:any=[];
    res_search:any=[]
    page:number=1
    vehiculos:any;
    type:string="";
    //?GESTION===================================================================================
    filtro:string="";
    length_comparar:number=0;
    marks:any;

    
    //?CONTROL===================================================================================
    loading:boolean=false;
    error_anio:number=0;
    error_pot:number=0;
    error_cil:number=0;
    count:number=0;
    // *FILTRO======

    types_fil:any={
        type:null
    }
    
    types_fuel:any;
    types_trans:any;
    types_tracc:any;

    avanzada:boolean=false;
    filter:any={
        type:'',
        make_id:null,
        model_id:null,
        body_type_id:null,
        to_first_registration_year:null,
        from_first_registration_year:null,
        to_mileage:500000,
        from_mileage:0,
        to_price:5000000,
        from_price:500,
        condition:null,
        country:null,
        city:null,
        mileage:null,
        fuel_type_id:null,
        category:null,
        vehicle_category_id:null,
        transmission_type_id:null,
        drive_type_id:null,
        to_power_hp:null,
        from_power_hp:null,
        to_engine_displacement:null,
        from_engine_displacement:null,
        exterior_color:null,
        interior_color:null,
        inspection_valid_until_year:"",
        inspection_valid_until_month:null,
        dealer:null,
        doors:null,
        seats:null,
        sleeping_places:null,
        fuel_consumption:null,
        higher_price:false,
        lower_price:false,
        oldest:false,
        newer:true,
    }

    search_bar:any={
        filter:null,
        type:null
    }

    searchall:any={
        filter : ""
    }

    ctrl_search:boolean=false;
    body_types:any;
    marcas:any;
    modelos:any;
    categorias:any;
    subcategorias:any;
    sel_marca:any;
    sel_marca_name:any="";
    sel_modelo:any;
    sel_modelo_name:any="";
    sel_consumo_name:any="";
    sel_puertas_name:any="";
    sel_condicion_name:any="";
    sel_combustible_name:any="";
    sel_transmision_name:any="";
    sel_traccion_name:any="";
    sel_body_type_name:any="";
    sel_category_name:any="";
    sel_subcategory_name:any="";
    mobile:boolean=false;
    display_filter:boolean=false;
    //!FUNCIONES=============================================================

    //?CARGA=============================================================
    GetAutos(filtro:any){
        this.loading=true;
        let page=1;

        if(this.res.next_page_url){
            page=this.res.current_page+1
        }

        this.AutosService.GetAutos(filtro,page).then((res:any)=>{
            if(this.res.current_page){
                for (const property of res.data.data) {
                    this.res.data.push(property)
                }
                this.res.next_page_url = res.data.next_page_url;
                this.res.current_page = res.data.current_page;
            }else{
                this.res = res.data;
            }
            this.loading=false;
            this.ref.detectChanges()

        })
    }

    GetMotos(filtro:any){
        this.loading=true;
        let page=1;

        if(this.res.next_page_url){
            page=this.res.current_page+1
        }

        this.MotoService.GetMoto(filtro,page).then((res:any)=>{
            if(this.res.current_page){
                for (const property of res.data.data) {
                    this.res.data.push(property)
                }
                this.res.next_page_url = res.data.next_page_url;
                this.res.current_page = res.data.current_page;
            }else{
                this.res = res.data;
            }
            this.loading=false;
            this.ref.detectChanges()

        })
    }

    GetMobile(filtro:any){
        this.loading=true;
        let page=1;

        if(this.res.next_page_url){
            page=this.res.current_page+1
        }
        this.MobileHomeService.GetMobile(filtro,page).then((res:any)=>{
            if(this.res.current_page){
                for (const property of res.data.data) {
                    this.res.data.push(property)
                }
                this.res.next_page_url = res.data.next_page_url;
                this.res.current_page = res.data.current_page;
            }else{
                this.res = res.data;
            }
            console.log(res)
            this.loading=false;
        })
    }

    GetTruck(filtro:any){
        this.loading=true;
        let page=1;

        if(this.res.next_page_url){
            page=this.res.current_page+1
        }

        this.TruckService.Get(this.filtro,page).then(res=>{
            if(this.res.current_page){
                for (const property of res.data.data) {
                    this.res.data.push(property)
                }
                this.res.next_page_url = res.data.next_page_url;
                this.res.current_page = res.data.current_page;
            }else{
                this.res = res.data;
            }
            this.loading=false;
            this.ref.detectChanges()

        })
    }

    GetMarcas(){
        this.marcas=[]
        this.modelos=[]
        this.sel_marca_name=""
        this.sel_modelo_name=""

        this.AutosService.Marcas(this.filter.type).then(res=>{
            this.marcas = res.data.data;
        }) 
        
    }

    GetModelos(marca:any){
        this.modelos=null;
        this.sel_marca_name=marca.name;
        this.filter.make_id = marca.id;
        this.AutosService.Modelos(marca.id).then( (res:any)=>{
            this.modelos=res.data.data
        })
    }

    AddComparar(item:any, ev:any){
        console.log(item)
        console.log(this.CompararService.vehiculos.length)
        
        if($(ev.target).hasClass('btn-primary')){
            
        }else{
            if(this.CompararService.vehiculos.length <2){
                this.CompararService.vehiculos.push(item)
                this.length_comparar = this.CompararService.vehiculos.length
                $(ev.target).addClass('btn-primary')
                $(ev.target).removeClass('btn')
            }
        }

        
    }

    GetTypeFuel(){
        this.VehiculosService.TypesFuel(this.filter.type).then((res:any)=>{
            console.log(res.data)
            this.types_fuel = res.data;
        } )
    }

    GetTypesTransmision(){
        this.VehiculosService.TypesTransmision(this.filter.type).then((res:any)=>{
            console.log(res.data)
            this.types_trans = res.data;
        } ) 
    }

    GetTypesTraccion(){
        this.VehiculosService.TypesTraccion(this.filter.type).then((res:any)=>{
            console.log(res.data)
            this.types_tracc = res.data;
        } ) 
    }

    GetCarroceria(){
        this.VehiculosService.Carroceria(this.filter.type).then((res:any)=>{
            console.log(res.data)
            this.body_types = res.data;
        } ) 
    }

    GetCategoria(){
        this.subcategorias=[];
        this.categorias=[]
        this.VehiculosService.Categoria(this.filter.type).then((res:any)=>{
            console.log(res.data)
            this.categorias = res.data;
        } ) 
    }

    GetSubCategoria(){
        this.subcategorias=[];
        this.VehiculosService.SubCategoria(this.sel_category_name).then( (res:any)=>{
            console.log(res)
            this.subcategorias=res.data;
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

    GoToWts(phone:any){
        if(phone){
            window.open('https://wa.me/'+phone, "_blank");
        }
    }
    

    Filtrar(page:number){
        if(this.mobile){
            this.display_filter=false;
        }
        this.loading=true;
        this.filter.from_mileage = parseInt(this.filter.from_mileage)
        this.filter.to_mileage = parseInt(this.filter.to_mileage)
        this.filter.inspection_valid_until_year = parseInt(this.filter.inspection_valid_until_year)
        this.filter.inspection_valid_until_month = parseInt(this.filter.inspection_valid_until_month)
        this.res.data=[]
        this.AdsService.filter(this.filter,page).then(res=>{

            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            console.log(res.data.data)
            this.res = res.data;

            if(this.filter.type == 'auto' && this.filter.make_id == null && this.filter.model_id == null && this.filter.country == null){
                this.res.total = 0;
                this.AdsService.GetCount({type:'all', make_id:null, model_id:null, country: null })
                .then(res=>{
                    
                    this.res.total =res.data
        
                })
            }
                // this.PaginateService.SetPaginate({last_page:this.res.last_page,current_page:this.res.current_page,next_page_url:this.res.next_page_url,prev_page_url:this.res.prev_page_url})
            this.loading=false;
            
            // this.GetMarcas()
        })

        
    }

    Search(page:number){
        this.loading=true;

        this.AdsService.FindSearch(this.search_bar.type,this.search_bar,page).then(res=>{
            
            this.res =[]
            this.res = res.data
            this.loading=false;

        })
    }
    
    OrderBy(tipo:any,fase:number){
        console.log(tipo)
        let order="";
        if(tipo == 'hightprice'){
            order='orderBy=price&orderDirection=desc&'
            this.filter.higher_price=true
            this.filter.lower_price=false
            this.filter.oldest=false
            this.filter.newer=false
        }
        if(tipo == 'lowprice'){
            order='orderBy=price&orderDirection=asc&'
            this.filter.higher_price=false
            this.filter.lower_price=true
            this.filter.oldest=false
            this.filter.newer=false
        }
        if(tipo == 'created_old'){
            order='orderBy=created_at&orderDirection=asc&'
            this.filter.higher_price=false
            this.filter.lower_price=false
            this.filter.oldest=true
            this.filter.newer=false
        }
        if(tipo == 'created_new'){
            order='orderBy=created_at&orderDirection=desc&'
            this.filter.higher_price=false
            this.filter.lower_price=false
            this.filter.oldest=false
            this.filter.newer=true
        }
        if(fase == 0){
            this.res=[]
            this.page = 0;
            this.Filtrar(this.page)
            // this.GetAutos(this.filtro+order)
        }else{
            this.Filtrar(this.page)
        }

    }

    SearchAll(page:number){
        this.loading=true;
        this.res.data=[]
        this.AdsService.SearchAll(this.searchall,page).then(res=>{

            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            let temp=res.data;
            let data=[]
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
            console.log(temp)
            this.res = temp

            this.loading=false;

        })
    }

    //?CONTROL==============================================================================

    // SetAnio(tipo:any){
    //     setTimeout(
    //         ()=>{
    //             if(tipo == 'anio_desde'){
    //                 this.filter.from_first_registration_year= parseInt($("#anio_desde").val())
    //             }else{
    //                 this.filter.to_first_registration_year  = parseInt($("#anio_hasta").val())
    //             }
    //         },
    //         500
    //     )
    // }

    GetThumb(photo:any){
        if(photo != null){
            if(photo.includes('http')){
                return photo;
            }else{
                return 'https://cdn.autosmotos.es/'+photo
            }
        }
    }

    openComparar(){
        this.CompararService.toggle()
    }

    dropDown(id:any){
        if($("#"+id).hasClass("down") ){
            $("#"+id).removeClass("down")
        }else{
            $("#"+id).addClass("down")
        }
    }

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
            
                // console.log('type: ',item?.ad?.type)
                // console.log('id: ',item?.id)
                // console.log('id_ad',item?.ad.id)
                type=item?.ad?.type;
                id=item?.id
                id_ad=item?.ad.id

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

    Scroll(e:any){
        var elem = $('html');
        var elem1 = $('.content');

        if ( (elem1[0].scrollHeight - elem.scrollTop()) <= elem.outerHeight()) {
            if( !this.loading ){
                // this.loading=true;
                // if(this.res.current_page){
                //     if(this.res.next_page_url){
                //         this.Search()
                //     }
                // }else if (!this.res.current_page && !this.res.next_page_url){
                //     this.page+=1;
                //     this.Filtrar(this.page)
                // }
                
                // if(this.filter.types[0]=='auto'){
                //     this.GetAutos(this.filtro)
                // }
                // if(this.filter.types[0]=='moto'){
                //     this.GetMotos(this.filtro)
                // }
                // if(this.filter.types[0]=='mobile-home'){
                //     this.GetMobile(this.filtro)
                // }
                // if(this.filter.types[0]=='truck'){
                //     this.GetTruck(this.filtro)
                // }
            }
            this.res.next_page_url = null;
            this.ref.detectChanges()

        }
    }

    PintarRango(tipo:any){
        if(tipo == 'km'){
            if(this.filter.from_mileage > this.filter.to_mileage){
                this.filter.from_mileage = this.filter.to_mileage-1
            }
            if(this.filter.to_mileage > 500000){
                this.filter.to_mileage = 500000
            }
            let val1=( (this.filter.from_mileage-0) /(500000-0)) *100;
            let val2=( (this.filter.to_mileage -0) / (500000-0)) *100;
            $("#line-distancia").css('background', 'linear-gradient( to right, #DFDFDF '+(val1)+'%'+', #ED1C24 '+(val1)+'%'+', #ED1C24 '+val2+'%'+', #DFDFDF '+val2+'%'+')');
        }
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

    GetPrice(price:any){
        price = price.split('.')[0]
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        return price.toString().replace(exp,rep);
    }

    SoloNumero(e:any){
        return SoloNumero(e)
    }
    

    SoloLetra(e:any){
        return SoloLetra(e)
    }

    CargarLogoMarca(marca:any){
        return 'https://www.auto-data.net/img/logos2/'+marca.name.replace(' ','_')+'.png'
    }

    CargarLogoBody(type:any){
        return 'https://cdn.autosmotos.es/'+type.icon_url
    }

    // ! FILTROS============================


    SelectType(type:string){

        this.filter.type=''
        this.filter.type = type;
        this.filter.make_id=null;
        this.filter.model_id=null;
        this.filter.body_type_id=null;
        this.filter.vehicle_category_id=null;
        this.sel_category_name='';
        this.sel_body_type_name='';
        this.body_types=[]
        this.GetMarcas()
        this.GetCarroceria()
        this.GetTypeFuel()
        this.GetTypesTraccion()

        if(this.filter.type !='auto'){
            this.GetCategoria()
        }else{
            this.categorias=[]
        }
        if(this.filter.type =='mobile-home'){
            this.sel_category_name='Mobile home'
            this.GetSubCategoria()
        }

        console.log(this.filter)
    }

    SelectModel(model:any){
        this.sel_modelo_name= model.name
        this.filter.model_id = model.id;

    }

    RangePaint(id:any){
        let val1= ($("#"+id).val() /500000) *100;
        $("#"+id).css('background', 'linear-gradient( to right, #FF3C76 0 '+val1+'% , #DFDFDF  0% '+(100-val1)+'%)');
    }

    ValFormatAnio(sect,type:any){
        this.error_anio=0;
        if(sect == 1){
            if(type){
                if(this.filter.from_first_registration_year.length < 4){
                    this.error_anio=1;
                    return
                }
                if(VacioU(this.filter.to_first_registration_year)){
                    this.error_anio=2;
                    return
                }
                
            }else{
                if(VacioU(this.filter.to_first_registration_year)){
                    this.error_anio=2;
                    return
                }
                if(this.filter.to_first_registration_year < 4){
                    this.error_anio=1;
                    return
                }
                
            }
        }
        else if(sect == 2){
            this.error_pot=0;  
            if(VacioU(this.filter.to_power_hp)){
                this.error_pot=2;
                return
            }
        }
        else if(sect == 3){
            this.error_cil=0;  
            if(VacioU(this.filter.to_engine_displacement)){
                this.error_cil=2;
                return
            }
        }
        
    }

    LimpiarFiltro(){
        this.filter.make_id=null
        this.filter.model_id=null
        this.filter.to_first_registration_year=null
        this.filter.from_first_registration_year=null
        this.filter.to_mileage=500000
        this.filter.from_mileage=0
        this.filter.to_price=5000000
        this.filter.from_price=500
        this.filter.condition=null
        this.filter.country=null
        this.filter.city=null
        this.filter.category=null
        this.filter.mileage=null
        this.filter.fuel_type_id=null
        this.filter.transmission_type_id=null
        this.filter.vehicle_category_id=null
        this.filter.drive_type_id=null
        this.filter.to_power_hp=null
        this.filter.from_power_hp=null
        this.filter.to_engine_displacement=null
        this.filter.from_engine_displacement=null
        this.filter.inspection_valid_until_year=null
        this.filter.inspection_valid_until_month=null
        this.filter.exterior_color=null
        this.filter.interior_color=null
        this.filter.dealer=null
        this.filter.doors=null
        this.filter.seats=null
        this.filter.higher_price=false
        this.filter.lower_price=false
        this.filter.oldest=false
        this.filter.newer=false
        this.filter.sleeping_places = null;
        this.sel_marca_name = "";
        this.sel_marca = null;
        this.sel_modelo = null;
        this.sel_modelo_name = "";
        this.sel_category_name='';
        this.sel_subcategory_name='';
        this.modelos=null;
        this.PintarRango('km')
        this.PintarRango('price')
        this.page=0
        this.Filtrar(this.page)
    }


    pageChanged(ev){
        console.log(ev)
        this.res.current_page = ev;

        if(this.res.path.includes('search_ads_like')){
            this.SearchAll(ev);
        }
        if(this.res.path.includes('search_advanced')){
            this.Filtrar(ev)
        }
        if(this.res.path.includes('search/like')){
            this.Search(ev)
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

    GoToDealer(id){
        this.router.navigate(['dealers/'+id])
    }

}
