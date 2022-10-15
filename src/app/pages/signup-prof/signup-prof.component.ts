import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { Vacio, VacioU, SoloLetra, SoloNumeroTelf } from '../../../assets/script/general';
import { Router} from '@angular/router';

@Component({
    selector: 'app-signup-prof',
    templateUrl: './signup-prof.component.html',
    styleUrls: ['./signup-prof.component.scss','./signup-prof-mobile.component.scss']
})
export class SignupProfComponent implements OnInit {

    constructor(
        private UserService:UserService,
        private router: Router,
        private fb: FormBuilder,

    ) { 
        this.FormDealer = this.fb.group({
            company_name:[null,[Validators.required]],
            vat_number:[null,[Validators.required]],
            country:["",[Validators.required]],
            address:[null,[Validators.required]],
            zip_code:[null,[Validators.required]],
            city:[null,[Validators.required]],
            email_address:[null,[Validators.required]],
            phone_number:[null,[Validators.required]],
            description:[null,[Validators.required]]
        })

        this.FormDealerShowRoom = this.fb.group({
            name:[null,[Validators.required]],
            country:["",[Validators.required]],
            address:[null,[Validators.required]],
            zip_code:[null,[Validators.required]],
            city:[null,[Validators.required]],
            email_address:[null,[Validators.required]],
            mobile_number:[null,[Validators.required]],
            whatsapp_number:[null,[Validators.required]],
        })

        this.FormUser = this.fb.group({
            first_name:[null,[Validators.required]],
            last_name:[null,[Validators.required]],
            email:[null,[Validators.required]],
            zip_code:[null,[Validators.required]],
            password:[null,[Validators.required]],
            password_confirmation:[null,[Validators.required]]
        })

    }

    ngOnInit(): void {

    }


    
    //!DATA=====================================================================
    //?CARGA===================================================================================


    //?GESTION===================================================================================
    FormDealer: FormGroup ;
    FormDealerShowRoom: FormGroup ;
    FormUser: FormGroup ;
    get ValFormDealer() { return this.FormDealer.controls; }
    get ValFormDealerShowRoom() { return this.FormDealerShowRoom.controls; }
    get ValFormUser() { return this.FormUser.controls; }

    prof:any={
        dealer_company_name:null,
        dealer_vat_number:null,
        dealer_country:null,
        dealer_address:null,
        dealer_zip_code:null,
        dealer_city:null,
        dealer_logo_path:null,
        dealer_email_address:null,
        dealer_phone_number:null,
        dealer_description:null,
        dealer_show_room_name:null,
        dealer_show_room_country:null,
        dealer_show_room_address:null,
        dealer_show_room_zip_code:null,
        dealer_show_room_city:null,
        dealer_show_room_email_address:null,
        dealer_show_room_mobile_number:null,
        dealer_show_room_landline_number:null,
        dealer_show_room_market_id:null,
        dealer_show_room_whatsapp_number:null,
        user_first_name:null,
        user_last_name:null,
        user_whatsapp_number:null,
        user_landline_number:null,
        user_mobile_number:null,
        user_email:null,
        user_password:null,
        user_password_confirmation:null,

    }

    dealer:any={
        company_name:null,
        vat_number:null,
        country:"",
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
        country:"",
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
        dealer_id:null
    }


    //?CONTROL===================================================================================

    fase:number=1;
    user_imagen_show:any;
    img_user:any;
    formData = new FormData();
    acc_term:boolean=false;
    error:number=0;
    loading:boolean=false;
    viewPass:boolean=false;
    viewRePass: boolean = false;
    Val:boolean=false;

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

    SignUpProf(){

    }


    SignUpDealer(){
        this.formData=new FormData();
        this.error=0;
        this.loading = true;
        this.Val=true;
        if(!this.FormDealer.valid){
            this.error = 1;
            this.loading = false;
            return
        }
        if(VacioU(this.user_imagen_show)){
            this.error = 8;
            this.loading = false;
            return
        }

        if(
            !this.FormDealer.controls.email_address.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ){
            this.error=4
            this.loading = false;
            return
        }
        this.formData.append("dealer_logo_path",this.user_imagen_show.blob)
        this.formData.append("dealer_company_name",this.FormDealer.controls.company_name.value)
        this.formData.append("dealer_vat_number",this.FormDealer.controls.vat_number.value)
        this.formData.append("dealer_country",this.FormDealer.controls.country.value)
        this.formData.append("dealer_address",this.FormDealer.controls.address.value)
        this.formData.append("dealer_zip_code",this.FormDealer.controls.zip_code.value)
        this.formData.append("dealer_city",this.FormDealer.controls.city.value)
        this.formData.append("dealer_email_address",this.FormDealer.controls.email_address.value)
        this.formData.append("dealer_phone_number",this.FormDealer.controls.phone_number.value)
        this.formData.append("dealer_description",this.FormDealer.controls.description.value)
        this.Val=false;
        this.UserService.ValDealer({dealer_company_name:this.FormDealer.controls.company_name.value})
        .then( (res:any)=>{
            console.log(res)
            this.loading = false;

            this.FormDealerShowRoom.controls.name.setValue(this.FormDealer.controls.company_name.value);
            this.FormDealerShowRoom.controls.country.setValue(this.FormDealer.controls.country.value);
            this.FormDealerShowRoom.controls.address.setValue(this.FormDealer.controls.address.value);
            this.FormDealerShowRoom.controls.zip_code.setValue(this.FormDealer.controls.zip_code.value);
            this.FormDealerShowRoom.controls.city.setValue(this.FormDealer.controls.city.value);
            this.FormDealerShowRoom.controls.email_address.setValue(this.FormDealer.controls.email_address.value);
            this.FormDealerShowRoom.controls.mobile_number.setValue(this.FormDealer.controls.phone_number.value);

            this.fase=2;

        //     this.dealer_show.dealer_id = res.data.id;
        //     this.user.dealer_id = res.data.id
        //     this.fase=2;
        //     this.loading = false;

        //     this.dealer_show.name = this.dealer.company_name
        //     this.dealer_show.mobile_number = this.dealer.phone_number
        //     this.dealer_show.email_address = this.dealer.email_address

        }).catch(err=>{
            if(err.error.error.message.dealer_company_name){
                this.error = 3;
            }else{
                this.error = 2;
            }
            this.loading = false;

        })
    }

    // step 2
    SignUpDealerShowRooms(){
        this.error=0;
        this.loading = true;
        this.Val=true;
        if(!this.FormDealer.valid){
            this.error = 1;
            this.loading = false;
            return
        }
        if(
            !this.FormDealerShowRoom.controls.email_address.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ){
            this.error=4
            this.loading = false;
            return
        }

        this.formData.append("dealer_show_room_name",this.FormDealerShowRoom.controls.name.value)
        this.formData.append("dealer_show_room_country",this.FormDealerShowRoom.controls.country.value)
        this.formData.append("dealer_show_room_address",this.FormDealerShowRoom.controls.address.value)
        this.formData.append("dealer_show_room_zip_code",this.FormDealerShowRoom.controls.zip_code.value)
        this.formData.append("dealer_show_room_city",this.FormDealerShowRoom.controls.city.value)
        this.formData.append("dealer_show_room_email_address",this.FormDealerShowRoom.controls.email_address.value)
        this.formData.append("dealer_show_room_mobile_number",this.FormDealerShowRoom.controls.mobile_number.value)
        this.formData.append("dealer_show_room_whatsapp_number",this.FormDealerShowRoom.controls.whatsapp_number.value)
        this.Val=false;

        this.UserService.ValDealerShow({dealer_show_room_name:this.FormDealerShowRoom.controls.name.value})
        .then( (res:any)=>{
            console.log(res)
            this.FormUser.controls.zip_code.setValue(this.FormDealer.controls.zip_code.value);
            this.FormUser.controls.email.setValue(this.FormDealer.controls.email_address.value);
            this.fase = 3;
            this.loading = false;
        //     this.user.zip_code = this.dealer_show.zip_code
        //     this.user.email = this.dealer_show.email_address
        }).catch(err=>{
            console.log(err.error.error.message)
            if(err.error.error.message){
                this.error = 3;
            }else{
                this.error = 2;
            }
            this.loading = false;

        })
    }

    // step 3
    SignUp(){
        this.error=0;
        this.loading = true;
        this.Val=true;

        if(!this.FormUser.valid){
            this.error = 1;
            this.loading = false;
            return
        }
        if(
            !this.FormUser.controls.email.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ){
            this.error=4
            this.loading = false;
            return
        }
        if(
            this.FormUser.controls.password.value != this.FormUser.controls.password_confirmation.value 
        ){
            this.error=6
            this.loading = false;
            return
        }

        if(!this.acc_term){
            this.error = 7;
            this.loading = false;
            return
        }

        this.formData.append("user_first_name",this.FormUser.controls.first_name.value)
        this.formData.append("user_last_name",this.FormUser.controls.last_name.value)
        this.formData.append("user_email",this.FormUser.controls.email.value)
        this.formData.append("user_password",this.FormUser.controls.password.value)
        this.formData.append("user_password_confirmation",this.FormUser.controls.password_confirmation.value)
        this.formData.append("user_mobile_number",this.FormDealerShowRoom.controls.mobile_number.value)
        this.formData.append("user_whatsapp_number",this.FormDealerShowRoom.controls.whatsapp_number.value)
        this.Val=false;
        this.UserService.ValUser({user_email:this.FormUser.controls.email.value})
        .then(res=>{
            console.log(res)
            this.UserService.SignUpProf(this.formData)
            .then(res=>{
                console.log(res)
                this.loading = false;
                sessionStorage.setItem('email',this.FormUser.controls.email.value)
                this.router.navigate(['../login'])
            })
            .catch(err=>{
                console.log(err)
                this.loading = false;
                this.error = 2;
            })
            
        }).catch(err=>{
            console.log(err.error.error.message)
            if(err.error.error.message.company_name){
                this.error = 3;
            }
            else if(err.error.error.message.user_email){
                this.error = 5;
            }
            else if(err.error.error.message.password){
                this.error = 6;
            }
            else{
                this.error = 2;
            }
            this.loading = false;

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
        return SoloNumeroTelf(data)
    }

    tooglePass(tipo:boolean){
        if(tipo){
            this.viewPass = !this.viewPass;
        }else{
            this.viewRePass = !this.viewRePass;
        }
    }

    // id dealer e752cbbb-5ba2-4179-b08c-501e95926296
    // "id" con logo:"4c69e9f1-fffd-4169-9130-7b44fecd03a6"

    // id dealer show  c7c3557f-720f-4ca0-9540-91f0f1f5617f
}
