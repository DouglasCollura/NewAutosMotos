import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/services/signup/signup.service';
import { Router} from '@angular/router';
import { Vacio, VacioU, SoloLetra, SoloNumero, SoloNumeroTelf } from '../../../assets/script/general';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss','./signup-mobile.component.scss']
})
export class SignupComponent implements OnInit {

    constructor(
        private UserService:UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }


    usuario:any={
        type:'ocasional',
        first_name:'',
        last_name:'',
        mobile_number:'',
        whatsapp_number:'',
        email:'',
        password_confirmation:'',
        password:''
    }   
    acc_term:false;

    display_reg:boolean=false;
    loading:boolean=false;
    error:number=0;
    canSignUp:boolean=false;

    viewPass:boolean=false;
    viewRePass: boolean = false;

    OpenOcasional(){
        this.display_reg = true;
    }

    SignUp(){
        this.error=0;
        if(Vacio(this.usuario) || !this.acc_term){
            this.error=1;
            return
        }
        if(this.usuario.password.length < 8){
            this.error=3;
            return 
        }
        if(
            this.usuario.password != this.usuario.password_confirmation
        ){
            this.error=2;
            return 
        }
        if(
            !this.usuario.email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ){
            this.error=5;
            return 
        }
        this.loading=true;
        this.UserService.SignUp(this.usuario).then(res=>{
            this.loading = false;
            sessionStorage.setItem('email',this.usuario.email)
            this.router.navigate(['../login'])
        }).catch(res=>{

            if(res.error.errors?.password){
                this.error=2
            }
            if(res.error.errors?.email){
                this.error=6
            }
            console.log(res.error.errors)
            this.loading = false;

        });
    }

    CanSignUp(){
        console.log(this.canSignUp)
        if(Vacio(this.usuario) || !this.acc_term){
            return false
        }else{
            return true
        }
        if(this.usuario.password.length < 8){
            // this.canSignUp = false;
            return false
        }else
        if(this.usuario.password_confirmation != this.usuario.password){
            // this.canSignUp = false;
            return false

        }else if(
            this.usuario.first_name == "" || 
            this.usuario.last_name == "" || 
            this.usuario.mobile_number == "" || 
            this.usuario.whatsapp_number == '' || 
            this.usuario.email == "" || 
            !/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(this.usuario.email) ||
            !this.acc_term
        ){
            // this.canSignUp = false;
            return false
        
        }else{
            // this.canSignUp = true;
            return true

        }

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
}
