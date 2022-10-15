import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SoloNumero, VacioU } from 'src/assets/script/general';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-recovery-pass',
    templateUrl: './recovery-pass.component.html',
    styleUrls: ['./recovery-pass.component.scss']
})
export class RecoveryPassComponent implements OnInit {

    constructor(
        private UserService:UserService,
        private rutaActiva: ActivatedRoute

    ) { }

    ngOnInit(): void {
        this.rutaActiva.queryParams
        .subscribe((params:any) => {
            
            if(params.email){
                console.log(params.email)
                this.user.email = params.email
            }
        })
    }

    //!DATA=====================================================================
    //?CARGA===================================================================================


    //?GESTION===================================================================================
    
    user:any={
        email:null,
        code:null,
        password:null,
        password_confirmation:null,
    }

    code1:string=null
    code2:string=null
    code3:string=null
    code4:string=null

    viewPass:boolean=false;
    viewRePass: boolean = false;

    //?CONTROL===================================================================================

    fase:number=1;
    error:number=0;
    loading:boolean=false;
    //!FUNCIONES=============================================================

    //?CARGA=============================================================



    //?GESTION============================================================
    SendEmail(){
        this.error=0;
        this.loading=true;
        if(VacioU(this.user.email)){
            this.error = 3
            this.loading=false;
            return
        }
        if(
            !this.user.email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ){
            this.error=1;
            this.loading=false;
            return 
        }
        this.UserService.Recoverypass(this.user,this.fase)
        .then(res=>{
            console.log(res)
            this.fase = 2;
            this.loading=false;
        }).catch(err=>{
            this.loading=false;
            this.error=2;
        })
    }

    SendCode(){
        this.error=0;
        this.loading=true;

        let code:string = (this.code1+this.code2+this.code3+this.code4).toString()
        if(code.length != 4){
            this.error = 3;
            this.loading=false;
            return
        }else{
            this.user.code=code
            this.UserService.Recoverypass(this.user, this.fase)
            .then(res=>{
                this.fase = 3;
                this.loading=false;
            })
            .catch(error=>{
                this.loading=false;
                this.error=1;  
            })
        }
    }

    SendPass(){
        this.error=0;
        this.loading=true;

        if( VacioU(this.user.password) || VacioU(this.user.password_confirmation) ){
            this.error = 1
            this.loading=false;
            return
        }
        if(this.user.password.length < 8){
            this.error=3;
            this.loading=false;
            return 
        }

        if(this.user.password != this.user.password_confirmation){
            this.error = 2
            this.loading=false;
            return
        }

        this.UserService.Recoverypass(this.user, this.fase)
        .then(res=>{

            this.user.email=null;
            this.user.code=null;
            this.user.password=null;
            this.user.password_confirmation=null;
            this.code1=null
            this.code2=null
            this.code3=null
            this.code4=null

            location.href="login"
        })

    }

    //?CONTROL==============================================================================

    tooglePass(tipo:boolean){
        if(tipo){
            this.viewPass = !this.viewPass;
        }else{
            this.viewRePass = !this.viewRePass;
        }
    }
    SoloNumero(evt: any) {
        return SoloNumero(evt)
    }

    nextInput(e:any, next:string){
        if( e.target.value.length == e.target.getAttribute('maxlength')){
            $(`input[name='${next}']`).focus()
        }
    }

}
