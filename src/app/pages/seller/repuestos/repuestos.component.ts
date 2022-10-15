import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
declare var $: any;
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../../assets/script/general';
import { Router} from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.scss']
})
export class RepuestosComponent implements OnInit {

  formAnuncio: FormGroup | undefined;
  fase:any=1
  constructor(
    private UserService:UserService,
    private router: Router,
    private fb: FormBuilder,

) {
  this.formAnuncio = this.fb.group({
    idOrder: [null],
    idUser: [null, Validators.required],
    OrderNumber: [null, [Validators.required]],
    DateTime: [null, [Validators.required]],
    ProviderName: [null, [Validators.required]],
    Observation: [null],
    TotalValue: [null],

});

 }

ngOnInit(): void {
}



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

// fase:number=1;
user_imagen_show:any;
img_user:any;
formData = new FormData();
error:number=0;
loading:boolean=false;

//!FUNCIONES=============================================================

//?CARGA=============================================================



//?GESTION============================================================

CargarImagen(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let file = event.target.files[0];

    reader.onload = (e: any) => {
        this.user_imagen_show={img:e.target.result, blob:file};
    }
}


SignUpDealer(){
    this.error=0;
    this.loading = true;
    if(this.fase == 1){
        if(Vacio(this.dealer)){
            this.error = 1;
            this.loading = false;
            return
        }
        if(VacioU(this.user_imagen_show)){
            this.error = 1;
            this.loading = false;
            return
        }
    }
    this.formData.append("logo_path",this.user_imagen_show.blob)
    this.formData.append("company_name",JSON.stringify(this.dealer.company_name))
    this.formData.append("vat_number",JSON.stringify(this.dealer.vat_number))
    // this.formData.append("country",JSON.stringify(this.dealer.country))
    this.formData.append("country","prueba")
    this.formData.append("address",JSON.stringify(this.dealer.address))
    this.formData.append("zip_code",JSON.stringify(this.dealer.zip_code))
    this.formData.append("city",JSON.stringify(this.dealer.city))
    this.formData.append("email_address",JSON.stringify(this.dealer.email_address))
    this.formData.append("phone_number",JSON.stringify(this.dealer.phone_number))
    this.formData.append("description",JSON.stringify(this.dealer.description))
    this.formData.append("status",'10')


    this.UserService.SignUpDealer(this.formData).then( (res:any)=>{
        console.log(res)
        this.dealer_show.dealer_id = res.data.id;
        this.fase=2;
        this.loading = false;

    }).catch(err=>{
        this.error = 2;
        this.loading = false;

    })
}


SignUpDealerShowRooms(){
    this.error=0;
    this.loading = true;

    if(this.fase == 2){
        if(Vacio(this.dealer_show)){
            this.error = 1;
            this.loading = false;
            return
        }
    }
    this.UserService.SignUpDealerShowRooms(this.dealer_show).then( (res:any)=>{
        console.log(res.data.id)
        this.fase = 3;
        this.loading = false;

    })
}

SignUp(){
    this.error=0;
    this.loading = true;

    if(this.fase == 2){
        if(Vacio(this.user)){
            this.error = 1;
            this.loading = false;

            return
        }
    }
    this.UserService.SignUp(this.user).then(res=>{
        console.log(res)
        this.loading = false;

        this.router.navigate(['../login'])
    });
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

SoloNumero(data:any){
    return SoloNumero(data)
}


cambiofase(fase:any){
  this.fase=fase;
}

// id dealer e752cbbb-5ba2-4179-b08c-501e95926296
// "id" con logo:"4c69e9f1-fffd-4169-9130-7b44fecd03a6"

// id dealer show  c7c3557f-720f-4ca0-9540-91f0f1f5617f

}
