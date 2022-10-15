import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import {AdsService } from 'src/app/services/ads/ads.service';
declare var $: any;
import { Vacio, VacioU, SoloLetra, SoloNumero, SoloNumeroTelf } from '../../../../assets/script/general';
import { Router,ActivatedRoute} from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalSuccessService } from 'src/app/components/modals-success/modal-success.service';
import { ModalsService } from 'src/app/components/modals/modals.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.scss']
})
export class AlquilerComponent implements OnInit {
    formAnuncio: FormGroup;
    market: any
    user_imagen_show2
    loading=false
    editar=false
  constructor(
    private UserService:UserService,
    private router: Router,
    private ads : AdsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ModalSuccessService:ModalSuccessService,
    private ModalsService:ModalsService

) {
    this.formAnuncio = this.fb.group({
        id:[''],
        slug: [null],
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        status: [0],
        is_featured: [false],
        user_id: [null, [Validators.required]],
        market_id: [null,[Validators.required]],
        external_id: [null],
        source: [null],
        images_processing_status: ['noimage'],
        images_processing_status_text: ['noimage'],
        address: [null, [Validators.required]],
        latitude: [null],
        longitude: [null],
        zip_code: [null, [Validators.required]],
        city: [null,[Validators.required]],
        country: [null],
        mobile_number:[null,[Validators.required]],
        whatsapp_number:[null,[Validators.required]],
        website_url:[null],
        geocoding_status:[null],
        email_address:[null,[Validators.required]],
        images:[''],
        eliminated_thumbnail: [0]


     
    });
    


this.activatedRoute.params
.pipe(
  switchMap(params => {
    if (params['id']) {
      return this.ads.GetRentalads(params['id']);
    } else {
      return of(null);
    }
  })
)
.subscribe(data => {
  if (data) {
    this.editar=true
    this.formAnuncio.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id'])
    this.formAnuncio.controls['description'].setValue(JSON.parse(JSON.stringify(data)).data['description'])
    this.formAnuncio.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
    this.formAnuncio.controls['slug'].setValue(JSON.parse(JSON.stringify(data)).data['slug'])
    this.formAnuncio.controls['title'].setValue(JSON.parse(JSON.stringify(data)).data['title'])
    this.formAnuncio.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['address'])
    this.formAnuncio.controls['user_id'].setValue(JSON.parse(JSON.stringify(data)).data['user_id'])
    
    this.formAnuncio.controls['zip_code'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['zip_code'])
    this.formAnuncio.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['city'])
    this.formAnuncio.controls['country'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['country'])
    this.formAnuncio.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['mobile_number'])
    this.formAnuncio.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['whatsapp_number'])
    this.formAnuncio.controls['website_url'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['website_url'])
    this.formAnuncio.controls['email_address'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['email_address'])

   
    this.user_imagen_show2='https://cdn.autosmotos.es/'+JSON.parse(JSON.stringify(data)).data['thumbnail']
    // this.formAnuncio.controls['type'].setValue(JSON.parse(JSON.stringify(data)).data['type'])
    // this.datosUsuario=JSON.parse(JSON.stringify(data)).data
    // this.toEdit$.next(JSON.parse(JSON.stringify(data)).data);
    // this.formD.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id']);
    // this.formD.controls['first_name'].setValue(JSON.parse(JSON.stringify(data)).data['first_name']);
    // this.formD.controls['email'].setValue(JSON.parse(JSON.stringify(data)).data['email']);
    // this.formD.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data['city']);
    // this.formD.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data['whatsapp_number']);
    // this.formD.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data['mobile_number']);
    // this.formD.controls['country'].setValue(JSON.parse(JSON.stringify(data)).data['country']);
    // this.formD.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data['address']);
    // this.formD.controls['descripcion'].setValue(data['descripcion']);
    // this.formD.controls['precio'].setValue(data['precio']);

    // if(data['videos'].length > 0){
    //   this.videos = data['videos']
    // }

    console.log('este es el usuario',data)
  }
})


 }

ngOnInit(): void {
    //const user = JSON.parse(JSON.stringify(localStorage.getItem('user_seller')));
    const user = JSON.parse(localStorage.getItem('user_seller'));
    if (user) {
        this.formAnuncio.controls['user_id'].setValue(user.id)
        this.formAnuncio.controls['mobile_number'].setValue(user.mobile_number)
        this.formAnuncio.controls['whatsapp_number'].setValue(user.whatsapp_number)
        this.formAnuncio.controls['email_address'].setValue(user.email)
    }
   
    // if(user){
    //     this.formAnuncio.controls['user_id'].setValue(JSON.parse(user).id) 
    // }
    this.obtenetMarket()
}

get e() { return this.formAnuncio.controls; }


//!DATA=====================================================================
//?CARGA===================================================================================


//?GESTION===================================================================================

dealer:any={
    company_name:null,
    vat_number:null,
    country:"prueba",
    address:null,
    zip_code:null,
    city:null,
    email_address:null,
    phone_number:null,
    description:null,
    status:10
}

dealer_show:any={
    name:null,
    country:"prueba",
    address:null,
    zip_code:null,
    city:null,
    email_address:null,
    mobile_number:null,
    whatsapp_number:null,
    dealer_id:null
}

user:any={
    type:'profesional',
    first_name:null,
    last_name:null,
    email:null,
    zip_code:null,
    password:null,
    password_confirmation:null,

}


//?CONTROL===================================================================================

fase:number=1;
user_imagen_show:any;
img_user:any;
formData = new FormData();
error:number=0;
img: boolean = false;


//!FUNCIONES=============================================================

//?CARGA=============================================================



//?GESTION============================================================

CargarImagen(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let file = event.target.files[0];

    reader.onload = (e: any) => {
        this.user_imagen_show={img:e.target.result, blob:file};
        this.user_imagen_show2=''
        this.img = true;
    }
    console.log('entramos',this.user_imagen_show)
}

obtenetMarket(){
    
    this.ads.getMarket().subscribe(response => {

        this.market=JSON.parse(JSON.stringify(response)).data.data

        this.market.forEach((element:any,index:any) => {

            console.log('esto viene en el for',element)

            if(element.internal_name=='romania'){
                this.market[index]['nombre']='Rumania'
            }else  if(element.internal_name=='spain'){
                this.market[index]['nombre']='España'
            }else  if(element.internal_name=='germany'){
                this.market[index]['nombre']='Alemania'
            }else  if(element.internal_name=='italy'){
                this.market[index]['nombre']='Italia'
            }else  if(element.internal_name=='united_kingdom'){
                this.market[index]['nombre']='Reino Unido'
            }
            
        });
        console.log('este es  lo q viene',this.market)
    });
}


add() {
    // this.formAnuncio.controls['images'].setValue(this.user_imagen_show.blob)
    // this.formAnuncio.controls['country'].setValue(this.formAnuncio.controls['market_id'].value)
    // this.formAnuncio.controls['slug'].setValue(this.formAnuncio.controls['title'].value)
this.loading=true

if (this.user_imagen_show && this.user_imagen_show.blob) {
    this.formAnuncio.controls['eliminated_thumbnail'].setValue(1)
    this.formData.append("eliminated_thumbnail", this.formAnuncio.controls['eliminated_thumbnail'].value)
    this.formData.append("images", this.user_imagen_show.blob)
  } else {
    this.formAnuncio.controls['eliminated_thumbnail'].setValue(0)
    this.formData.append("eliminated_thumbnail", this.formAnuncio.controls['eliminated_thumbnail'].value)
  }

  const found = this.market.filter(element => element.id == this.formAnuncio.controls['market_id'].value);

  console.log('este es el name',found[0].internal_name)
  
  let nombrete
  
  if(found[0].internal_name=='romania'){
    nombrete='Rumania'
  }else  if(found[0].internal_name=='spain'){
    nombrete='España'
  }else  if(found[0].internal_name=='germany'){
    nombrete='Alemania'
  }else  if(found[0].internal_name=='italy'){
    nombrete='Italia'
  }else  if(found[0].internal_name=='united_kingdom'){
    nombrete='Reino Unido'
  }
  
  
    this.formData.append("market_id",this.formAnuncio.controls['market_id'].value)
    this.formData.append("country",nombrete)
    
        // this.formData.append("country",this.formAnuncio.controls['market_id'].value)
        this.formData.append("slug",this.formAnuncio.controls['title'].value)
        this.formData.append("title",this.formAnuncio.controls['title'].value)
        this.formData.append("description",this.formAnuncio.controls['description'].value)
        this.formData.append("status",'10')
        this.formData.append("ad_id",'')
        this.formData.append("user_id",this.formAnuncio.controls['user_id'].value)
        // this.formData.append("market_id",this.formAnuncio.controls['market_id'].value)
        this.formData.append("address",this.formAnuncio.controls['address'].value)
        this.formData.append("zip_code",this.formAnuncio.controls['zip_code'].value)
        this.formData.append("city",this.formAnuncio.controls['city'].value)
        // this.formData.append("country",this.formAnuncio.controls['country'].value)
        this.formData.append("mobile_number",this.formAnuncio.controls['mobile_number'].value)
        this.formData.append("whatsapp_number",this.formAnuncio.controls['whatsapp_number'].value)
        this.formData.append("website_url",this.formAnuncio.controls['website_url'].value)
        this.formData.append("email_address",this.formAnuncio.controls['email_address'].value)
        if (this.formAnuncio.valid) {
    
            if(!this.editar){
                this.ads.add(this.formData).subscribe(response => {
                    this.loading=false
                    if (response) {
                      
                        console.log('esta',response)
                        this.modalOpen()
                        //   this.toast.success(response['message']);
                            this.router.navigate(['/seller/tienda']);
                    //   this.toast.success(response['message']);
                    //    this.router.navigate(['/admin/store/list']);
                    } else {
                    //   this.toast.error(JSON.stringify(response));
                    }
                  });
            }else{
    
                this.ads.addAlquilerUpdate(this.formAnuncio.controls['id'].value,this.formData).subscribe(response => {
                    this.loading=false
                    if (response) {
                      
                        console.log('esta',response)
                        this.modalOpen()
                        //   this.toast.success(response['message']);
                            this.router.navigate(['/seller/tienda']);
                    //   this.toast.success(response['message']);
                    //    this.router.navigate(['/admin/store/list']);
                    } else {
                    //   this.toast.error(JSON.stringify(response));
                    }
                  });
            }
    
       
    
    
        }



















    // }
  }

  modalOpen(){
    this.ModalSuccessService.toggle(1,'Tu anuncio se ha creado y está pendiente de aprobación. Te avisaremos cuando se haya aprobado', 1)
}

//?CONTROL==============================================================================

SelectImg() {
    $("#img").trigger("click");
}


Vacio(data:any){
    return Vacio(data)
}

VacioU(data:any){
    return VacioU(data)
}

SoloLetra(data:any){
    return SoloLetra(data)
}

SoloNumero(data: any) {
  return SoloNumeroTelf(data)
}

delete(){
    this.user_imagen_show='' 
    this.img = false;
}

// id dealer e752cbbb-5ba2-4179-b08c-501e95926296
// "id" con logo:"4c69e9f1-fffd-4169-9130-7b44fecd03a6"

// id dealer show  c7c3557f-720f-4ca0-9540-91f0f1f5617f

}