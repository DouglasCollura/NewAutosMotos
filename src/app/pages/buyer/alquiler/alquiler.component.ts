import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { RentalService } from 'src/app/services/ads/rental/rental.service';
import { AdsService } from 'src/app/services/ads/ads.service';
import { VacioU} from '../../../../assets/script/general'

// ! ASSETS ============================================
declare var $: any;


@Component({
    selector: 'app-alquiler',
    templateUrl: './alquiler.component.html',
    styleUrls: ['./alquiler.component.scss','./alquiler-mobile.component.scss']
})
export class AlquilerComponent implements OnInit {

    constructor(
        private RentalService:RentalService,
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

        this.search_bar.type='rental';

        let marks=JSON.parse(localStorage.getItem("marks") || '[]' )
        this.marks=marks.filter((e:any)=>{ return e.type == 'rental' })
        this.Get('',1)
    }

    rentals:any=[]
    search_bar:any={
        filter:null,
        type:null
    }

    filter:any={
        country:null,
        city:null,
        title:""
    }
    filtro:any=""

    //?CONTROL===================================================================================
    marks:any;
    loading:boolean=false;
    mobile:boolean=false;
    display_filter:boolean=false;

    Get(filtro:any,page:any){
        this.loading=true;
        this.rentals.data=[]
        this.RentalService.Get(page,filtro).then( (res:any)=>{
            this.rentals = res.data;
            // if(this.rentals.current_page){
            //     for (const property of res.data.data) {
            //         this.rentals.data.push(property)
            //     }
            //     this.rentals.next_page_url = res.data.next_page_url;
            //     this.rentals.current_page = res.data.current_page;
            // }else{
            //     this.rentals = res.data;
            // }
            this.loading=false;
            this.ref.detectChanges()

        })
    }

    Search(){

        let page=1;
        this.loading=true;
        if(this.rentals.next_page_url){
            page=this.rentals.current_page+1
        }

        this.AdsService.FindSearch(this.search_bar,page).then(res=>{
            if(this.rentals.current_page){
                for (const property of res.data.data) {
                    this.rentals.data.push(property)
                }
                this.rentals.next_page_url = res.data.next_page_url;
                this.rentals.current_page = res.data.current_page;
            }else{
                this.rentals =[]
                this.rentals = res.data
                console.log(this.rentals)
            }
            this.loading=false;

        })
    }

    filtrar(){

        this.loading=true;
        this.rentals=[]
        this.filtro=""

        if(!VacioU(this.filter.country) ){
            this.filtro+='filters[country]='+this.filter.country+'&'
        }

        if(!VacioU(this.filter.city) ){
            this.filtro+='filters[city]='+this.filter.city+'&'
        }

        if(!VacioU(this.filter.title) ){
            this.filtro+='filters[title]='+this.filter.title+'&'
        }
        if(this.mobile){
            this.display_filter = false;
        }
        this.Get(this.filtro,1)
    }



    OrderBy(tipo:any,fase:number){
        console.log(tipo)
        let order="";
        
        if(tipo == 'created_old'){
            order='?orderBy=created_at&orderDirection=asc&'
        }

        if(tipo == 'created_new'){
            order='?orderBy=created_at&orderDirection=desc&'
        }
        this.rentals=[]
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
    //         console.log("asd")
    //         if(this.rentals.next_page_url != null && this.loading == false){
    //             this.loading=true;

    //             if(this.rentals.path.includes('search_ads_like_title')){
    //                 this.Search()
    //             }else{
    //                 this.Get('')
    //             }
    //         }
    //         this.rentals.next_page_url =null;
    //     }
    // }

    onImgError(event:any){
        event.target.src = '../../../assets/img/logo.svg'
       //Do other stuff with the event.target
    }

    GoToWts(phone:any){
        window.open('https://wa.me/'+phone, "_blank");
    }

    filterMark(id:any){
        for (const key of this.marks) {

            if(key.id_ad == id){
                return true
            }
        }
        return false;
    }

    GoPage(web:any){
        window.open(web, "_blank");
    }

    SelectMark(item:any, ev:any){
        console.log(item)
        let type="";
        let id="";
        let id_ad="";
        let marks=[];

        type=item?.type;
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
            this.marks=marks.filter((e:any)=>{ return e.type == 'rental' })

        }else{
        
            console.log($('#btn'+ev))
            $('#btn'+ev).removeClass('btn-bookmark').addClass('btn-bookmark-primary')
            marks.push({type:type,id:id,id_ad:id_ad})
            this.marks=marks.filter((e:any)=>{ return e.type == 'rental' })
            $(ev.target)
            console.log(marks)
            localStorage.setItem('marks', JSON.stringify(marks));
        }
        
    }

    dropDown(id:any){
        if($("#"+id).hasClass("down") ){
            $("#"+id).removeClass("down")
        }else{
            $("#"+id).addClass("down")
        }
    }

    LimpiarFiltro(){
        this.filter.country=null;
        this.filter.city=null;
        this.filter.title="";
        this.rentals=[]
        this.Get('',1)
    }


    pageChanged(ev){
        console.log(ev)
        this.rentals.current_page = ev;
        this.Get(this.filtro,ev)
    }
}
