import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../assets/script/general';
import { Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private UserService:UserService,
        private router: Router,

    ) { }

    ngOnInit(): void {
        if(sessionStorage.getItem('email')){
            this.usuario.email = sessionStorage.getItem('email');
            sessionStorage.removeItem('email')
        }
    }

    loading:boolean=false;
    error:number=0;
    usuario:any={
        email:null,
        password:null
    }   

    LogIn(){
        if(Vacio(this.usuario)){
            this.error = 1;
            return
        }
        this.loading = true;
        this.UserService.LogIn(this.usuario)
        .then((res:any)=>{
            localStorage.setItem('last_plan', JSON.stringify(res.plan_active))
            localStorage.setItem('token',res.token)
            localStorage.setItem('user_seller', JSON.stringify(res.user))
            this.loading = false;
            setTimeout(() => {
                location.href = 'seller/perfil'
            }, 500);
        }).catch(err=>{
            console.log(err.error.error)
            if(err.error.error=='invalid_credentials'){
                this.error=2;
            }
            this.loading = false;

        });
    }

}
