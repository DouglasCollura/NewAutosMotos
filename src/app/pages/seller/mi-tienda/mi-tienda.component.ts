import { Component, OnInit } from '@angular/core';
import { ModalEditTiendaService } from 'src/app/components/modal-edit-tienda/modal-edit-tienda.service';
import { ModalPromocionarService } from 'src/app/components/modal-promocionar/modal-promocionar.service';
import { ModalSuccessService } from 'src/app/components/modals-success/modal-success.service';
import { ModalsService } from 'src/app/components/modals/modals.service';
import { SellerService } from '../seller/seller.service';
import { MiTiendaService } from './mi-tienda.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { ModalConfirmationService } from 'src/app/components/modal-confirmation/modal-confirmation.service';
import { HttpClient } from '@angular/common/http';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
    selector: 'app-mi-tienda',
    templateUrl: './mi-tienda.component.html',
    styleUrls: ['./mi-tienda.component.scss']
})
export class MiTiendaComponent implements OnInit {
    constructor(
        private ModalEditTiendaService: ModalEditTiendaService,
        private ModalSuccessService: ModalSuccessService,
        private ModalPromocionarService: ModalPromocionarService,
        private ModalsService: ModalsService,
        private SellerService: SellerService,
        private MiTiendaService: MiTiendaService,
        private ModalConfirmationService: ModalConfirmationService,
        private http: HttpClient
    ) {
        const get = JSON.stringify(localStorage.getItem('user_seller'))
        this.user = JSON.parse(JSON.parse(get))
    }

    user: any = [];

    tienda: any = [];
    alquilerVehiculos: any = [];
    serviciosTaller: any = [];
    modal_notvalid:boolean=false;
    modal_token:boolean=false;


    loading1 = true;
    loading2 = true;
    loading3 = true;
    loading4 = true;
    loading5 = true;
    
    async ngOnInit() {
        // valida si hay una tienda almacenada para no volver a consulta
        if (!sessionStorage.getItem('AutosMotosShop')) {
            await this.MiTiendaService.getMiTienda(this.user.dealer_id)
                .then(res => {
                    console.log(res)
                    this.tienda = res.data;
                    sessionStorage.setItem('AutosMotosShop', JSON.stringify(res.data))
                }).catch(res=>{
                    if(res.status == 401){
                        this.modal_token=true;
                    }
                })
        } else {
            const get = JSON.stringify(sessionStorage.getItem('AutosMotosShop'))
            this.tienda = JSON.parse(JSON.parse(get))
            // console.log(JSON.parse(JSON.parse(get)))
        }
        // obtine lo anuncios de la tienda
        await this.SellerService.getServices('auto')
            .then(res => {
                let temp = res;
                console.log("temp")
                console.log(temp)
                let data = []
                temp.data.filter((dat) => {
                    if (dat?.auto_ad != null) {
                        dat.auto_ad.ad.images = dat.images
                        data.push(dat.auto_ad)
                    }
                    if (dat?.moto_ad != null) {
                        dat.moto_ad.ad.images = dat.images
                        data.push(dat.moto_ad)
                    }
                    if (dat?.truck_ad != null) {
                        dat.truck_ad.ad.images = dat.images
                        data.push(dat.truck_ad)
                    }
                    if (dat?.mobile_home_ad != null) {
                        dat.mobile_home_ad.ad.images = dat.images
                        data.push(dat.mobile_home_ad)
                    }
                });
                temp.data = data;
                console.log("temp")
                console.log(temp)
                this.productos = temp.data
                this.loading1 = false;
            })
            .catch(err => {
                this.loading1 = false;
                this.productos = [];
                if(err.status == 401){
                    console.log("asd")
                    this.modal_token=true;
                }
            })
        // obtiene los recambios de la tienda
        await this.SellerService.getServices('shop')
            .then(res => {
                this.recambios = res.data;
                this.loading2 = false;
            })
            .catch(err => {
                this.loading2 = false;
                this.recambios = [];
            })
        //  servicios - alquiler de vehiculos
        await this.SellerService.getServices('rental')
            .then(res => {
                console.log(res)
                this.alquilerVehiculos = res.data;
                this.loading3 = false;
            })
            .catch(err => {
                this.loading3 = false;
                this.alquilerVehiculos = [];
            })
        //  servicios - servicios de taller
        await this.SellerService.getServices('mechanic')
            .then(res => {
                this.loading4 = false;
                this.serviciosTaller = res.data;
            })
            .catch(err => {
                this.loading4 = false;
                this.serviciosTaller = [];
            })
        //  resenas de la tienda
        await this.SellerService.getResenas()
            .then(res => {
                this.loading5 = false;
                this.resenas = res.data;
            })
            .catch(err => {
                this.loading5 = false;
                this.resenas = [];
            })
    }

    onImgError(event: any) {
        event.target.src = '../../../assets/img/logo.svg'
        //Do other stuff with the event.target
    }

    // EDITAR NEGOCIO
    edit() {
        this.ModalEditTiendaService.toggle(this.tienda, this.user)
    }

    // PROMOCIONAR NEGOCIO - ENVIAR ID DEL NEGOCIO
    promocionar(articulo: number, name: string) {
        this.ModalPromocionarService.toggle(articulo, name)
    }

    // LANZA MODAL DESPUES DE HABERSE PROMOCIONADO EL NEGOCIO, RECICE TIPO Y TEXTO
    succesPromo(e: string) {
        // this.ModalSuccessService.toggle(1, e);
    }

    // CREAR PROMOCION
    crear() {
        if(this.user.status !== 'Aprobado' || this.user.email_verified_at == null){
            this.modal_notvalid=true;
        }else{
            this.ModalsService.toggle()
        }
    }

    productos: any = [];
    resenas: any = [];
    recambios: any = [];

    // convierte el texto largo en corto para no danar la interfaz
    subString(text: string) {
        if(text){
            return text.substring(0, 45)
        }
        return null
    }

    imageR = true;

    // trae la nueva informacion despues de haber actualizado
    successUpdated(dato: any) {
        if(dato.data.type == "Ocasional"){
            const get = JSON.stringify(localStorage.getItem('user_seller'))
            this.user = dato.data;
            localStorage.removeItem('user_seller');
            localStorage.setItem('user_seller', JSON.stringify(dato.data))
        }else{
            this.tienda = dato.data.dealer_show_room
            this.tienda.dealer = dato.data.dealer
            sessionStorage.setItem('AutosMotosShop', JSON.stringify(this.tienda))
        }
        console.log("dato")
        console.log(dato)
        
    }


    config: SwiperOptions = {
        slidesPerView: 6,
        navigation: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                
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
    config2: SwiperOptions = {
        slidesPerView: 4,
        navigation: true,
        breakpoints: {
            600: {
                slidesPerView: 1,

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


    confirmdeleted(id: any, tipo: number) {
        this.ModalConfirmationService.toggle()
        this.idSelected = id;
        this.typeSelected = tipo;
    }

    typeSelected: Number = 0;
    idSelected: any;

    async deleted() {
        if (this.typeSelected === 1) {
            this.refreshDelete1 = false;
            this.loading1 = true;
        }
        if (this.typeSelected === 2) {
            this.refreshDelete2 = false;
            this.loading2 = true;
        }
        if (this.typeSelected === 3) {
            this.refreshDelete3 = false;
            this.loading3 = true;
        }
        if (this.typeSelected === 4) {
            this.refreshDelete4 = false;
            this.loading4 = true;
        }
        this.MiTiendaService.deleteAds(this.idSelected)
            .then(() => {
                this.reloadInformation()
            })
    }

    refreshDelete1 = true;
    refreshDelete2 = true;
    refreshDelete3 = true;
    refreshDelete4 = true;

    async reloadInformation() {
        if (this.typeSelected === 1) {
            // obtine lo anuncios de la tienda
            await this.SellerService.getServices('auto')
                .then(res => {
                    let temp = res;
                    console.log("temp")
                    console.log(temp)
                    let data = []
                    temp.data.filter((dat) => {
                        if (dat?.auto_ad != null) {
                            dat.auto_ad.ad.images = dat.images
                            data.push(dat.auto_ad)
                        }
                        if (dat?.moto_ad != null) {
                            dat.moto_ad.ad.images = dat.images
                            data.push(dat.moto_ad)
                        }
                        if (dat?.truck_ad != null) {
                            dat.truck_ad.ad.images = dat.images
                            data.push(dat.truck_ad)
                        }
                        if (dat?.mobile_home_ad != null) {
                            dat.mobile_home_ad.ad.images = dat.images
                            data.push(dat.mobile_home_ad)
                        }
                    });
                    temp.data = data;
                    console.log("temp")
                    console.log(temp)
                    this.productos = temp.data
                    this.loading1 = false;
                    this.refreshDelete1 = true;
                })
                .catch(err => {
                    this.loading1 = false;
                    this.productos = [];
                    this.refreshDelete1 = true;
                })
        }
        if (this.typeSelected === 2) {
            // obtiene los recambios de la tienda
            await this.SellerService.getServices('shop')
                .then(res => {
                    this.recambios = res.data;
                    this.loading2 = false;
                    this.refreshDelete2 = true;
                })
                .catch(err => {
                    this.loading2 = false;
                    this.refreshDelete2 = true;
                })
        }
        if (this.typeSelected === 3) {
            //  servicios - alquiler de vehiculos
            await this.SellerService.getServices('rental')
                .then(res => {
                    this.alquilerVehiculos = res.data;
                    this.loading3 = false;
                    this.refreshDelete3 = true;
                })
                .catch(err => {
                    this.loading3 = false;
                    this.refreshDelete3 = true;
                })
        }
        if (this.typeSelected === 4) {
            //  servicios - servicios de taller
            await this.SellerService.getServices('mechanic')
                .then(res => {
                    this.loading4 = false;
                    this.serviciosTaller = res.data;
                    this.refreshDelete4 = true;
                })
                .catch(err => {
                    this.loading4 = false;
                    this.refreshDelete4 = true;
                })
        }
    }

    GoPage(web: any) {
        window.open(web, "_blank");
    }

    GetPrice(price: any) {
        if (price) {
            price = price.split('.')[0]
            const exp = /(\d)(?=(\d{3})+(?!\d))/g;
            const rep = '$1,';
            return price.toString().replace(exp, rep);
        } else {
            return 0
        }

    }

    GetThumb(photo: any) {
        if (photo != null) {
            if (photo.includes('http')) {
                return photo;
            } else {
                return 'https://cdn.autosmotos.es/' + photo
            }
        } else {
            return '../../../../assets/img/logo.svg'
        }
    }
}
