import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { AdsService } from 'src/app/services/ads/ads.service';
import { MechanicService } from 'src/app/services/ads/mechanic/mechanic.service';
import { VacioU} from '../../../../assets/script/general'
declare var $: any;

@Component({
    selector: 'app-talleres',
    templateUrl: './talleres.component.html',
    styleUrls: ['./talleres.component.scss','./talleres-mobile.component.scss']
})
export class TalleresComponent implements OnInit {

    constructor(
        private AdsService:AdsService,
        private MechanicService:MechanicService,
        private ref: ChangeDetectorRef,

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

        this.Get(this.filtro,1)
        // this.AdsService.filter({types:['mechanic']}).then(res=>{
        //     console.log(res.data.data)
        //     this.talleres = res.data.data
        // })

        this.marks=JSON.parse(localStorage.getItem("marks") || '[]' )
        this.marks=this.marks.filter((e:any)=>{ return e.type == 'mechanic' })
        this.search_bar.type='mechanic';

    }


    filter:any={
        country:null,
        city:null,
        title:""
    }


    talleres:any=[];
    marks:any=[];
    loading:boolean=false;
    filtro:any=""

    search_bar:any={
        filter:null,
        type:null
    }

    mobile:boolean=false;
    display_filter:boolean=false;

    Get(filtro:any,page:any){
        this.loading=true;
        this.talleres.data=[]
        this.MechanicService.Get(page,filtro).then(res=>{
            // if(this.talleres?.current_page){
            //     for (const property of res.data.data) {
            //         this.talleres.data.push(property)
            //     }
            //     this.talleres.next_page_url = res.data.next_page_url;
            //     this.talleres.current_page = res.data.current_page;
            // }

            this.talleres=res.data

            this.loading=false
            this.ref.detectChanges()

        })
    }

    GoPage(web:any){
        window.open(web, "_blank");
    }

    GoToWts(phone:any){
        window.open('https://api.whatsapp.com/send?phone='+phone, "_blank");
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
        
        // console.log($('#btn'+ev))
        // $('#btn'+ev).removeClass('btn-bookmark').addClass('btn-bookmark-primary')
        // marks.push({type:type,id:id,id_ad:id_ad})
        // $(ev.target)
        // console.log(marks)
        // localStorage.setItem('marks', JSON.stringify(marks));
        
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
        this.talleres=[]
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
    //         if(this.talleres.next_page_url != null && this.loading == false){
    //             this.loading=true;
    //             if(this.talleres.path.includes('search')){
    //                 this.Search()
    //             }else{
    //                 this.Get('')
    //             }
    //         }
    //         this.talleres.next_page_url =null;

    //     }
    // }

    dropDown(id:any){
        if($("#"+id).hasClass("down") ){
            $("#"+id).removeClass("down")
        }else{
            $("#"+id).addClass("down")
        }
    }

    onImgError(event:any){
        event.target.src = '../../../assets/img/logo.svg'
       //Do other stuff with the event.target
    }

    filterMark(id:any){
        for (const key of this.marks) {
            if(key.id_ad == id){
                return true
            }
        }
        return false;
    }


    filtrar(){

        this.loading=true;
        this.talleres=[]
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


    Search(){

        let page=1;
        this.loading=true;
        if(this.talleres.next_page_url){
            page=this.talleres.current_page+1
        }

        this.MechanicService.FindSearch(this.search_bar,page).then(res=>{
            if(this.talleres.current_page){
                for (const property of res.data.data) {
                    this.talleres.data.push(property)
                }
                this.talleres.next_page_url = res.data.next_page_url;
                this.talleres.current_page = res.data.current_page;
            }else{
                this.talleres =[]
                this.talleres = res.data
                console.log(this.talleres)
            }
            this.loading=false;

        })
    }

    LimpiarFiltro(){
        this.filter.country=null;
        this.filter.city=null;
        this.filter.title="";
        this.talleres=[]
        this.Get('',1)
    }

    pageChanged(ev){
        console.log(ev)
        this.talleres.current_page = ev;
        this.Get(this.filtro,ev)
    }

}
