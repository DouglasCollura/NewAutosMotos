 import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalConfirmationPromoService } from 'src/app/components/modal-confirmation-promo/modal-confirmation-promo.service';
import { PromocionesService } from 'src/app/services/promociones/promociones.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,SwiperOptions  } from 'swiper';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {

  constructor(
    private PromocionesService:PromocionesService,
    private ModalConfirmationPromoService:ModalConfirmationPromoService
  ) { }

  info:any=[];
  plan:any=[];

  async ngOnInit() {
    if(localStorage.getItem('last_plan')){
      this.plan = JSON.parse(localStorage.getItem('last_plan'))
    }
    this.getInformations()
    this.anunciosPromocionados();
    this.anunciosPrimeraPagina();
    this.serviciosPromocionados();
    this.serviciosPrimeraPagina();
  }

  productos:any=[];


  async getInformations(){
    await this.PromocionesService.getIn()
    .then((res:any)=>{
      console.log(res.data)
      this.info = res.data;
    })
  }

  onImgError(event:any){
    event.target.src = '../../../assets/img/logo.svg'
    //Do other stuff with the event.target
  }
  subString(text:string){
    return text.substring(0, 45)
  }

  customOptions: OwlOptions = {
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
        940: {
        items: 4
        }
    },
  }

  confirmdeleted(id:any, tipo:number){
  }

  config: SwiperOptions = {
    slidesPerView: 4,
    navigation: true,
    
    breakpoints: {
      0: {
        slidesPerView: 1,
        centeredSlides: true,
      },
      800: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
      1300: {
        slidesPerView: 4,
    },
    }
  };
  config3: SwiperOptions = {
    slidesPerView: 3,
    navigation: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      900: {
        slidesPerView: 1,
      },
      1230: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 3,
    },
    }
  };

  loading1=true;
  anunciosPromo:any=[];
  async anunciosPromocionados(){
    await this.PromocionesService.simpleVehiculos()
    .then((res:any)=>{
      console.log(res)
      this.loading1 = false;
      this.anunciosPromo = res.data;
    })
  }

  loading2=true;
  anunciosPage:any=[];
  async anunciosPrimeraPagina(){
    await this.PromocionesService.primeraPaginaVehiculos()
    .then((res:any)=>{
      console.log(res)
      this.loading2 = false;
      this.anunciosPage = res.data;
    })
  }

  loading3=true;
  serviciosPromo:any=[];
  async serviciosPromocionados(){
    await this.PromocionesService.simpleServicios()
    .then((res:any)=>{
      console.log(res)
      this.loading3 = false;
      this.serviciosPromo = res.data;
    })
  }

  loading4=true;
  serviciosPage:any=[];
  async serviciosPrimeraPagina(){
    await this.PromocionesService.primeraPaginaServicios()
    .then((res:any)=>{
      console.log(res)
      this.loading4 = false;
      this.serviciosPage = res.data;
    })
  }


  type=0;
  id:any;
  method=0;
  deletePromo(type:any, id:any, method:any){
   this.id = id;
   this.type = type;
   this.method = method;
   this.ModalConfirmationPromoService.toggle()
  }

  confirmDeletePromo(){
    this.getInformations()
    if(this.type === 1){
      this.PromocionesService.deletePromocion('simple', this.id)
      .then(()=>{
        if(this.method == 1){
          this.loading1 = true;
          this.anunciosPromocionados()
        }
        if(this.method == 2){
          this.loading2 = true;

          this.anunciosPrimeraPagina()
        }
        if(this.method == 3){
          this.loading3 = true;

          this.serviciosPromocionados()
        }
        if(this.method == 4){
          this.loading4 = true;

          this.serviciosPrimeraPagina()
        }
      })
    }
    if(this.type === 2){
      this.PromocionesService.deletePromocion('front_page', this.id)
      .then(()=>{
        if(this.method == 1){
          this.loading1 = true;
          this.anunciosPromocionados()
        }
        if(this.method == 2){
          this.loading2 = true;

          this.anunciosPrimeraPagina()
        }
        if(this.method == 3){
          this.loading3 = true;

          this.serviciosPromocionados()
        }
        if(this.method == 4){
          this.loading4 = true;

          this.serviciosPrimeraPagina()
        }
      })
    }
  }
}
