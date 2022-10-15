import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsService } from 'src/app/components/modals/modals.service';
import { UserService } from 'src/app/services/user/user.service';
import { MiTiendaService } from '../../seller/mi-tienda/mi-tienda.service';

@Component({
    selector: 'app-seller-layout',
    templateUrl: './seller-layout.component.html',
    styleUrls: ['./seller-layout.component.scss']
})
export class SellerLayoutComponent implements OnInit {

    constructor(
        private ModalsService:ModalsService,
        private route:Router,
        private ActivatedRoute:ActivatedRoute,
        private UserService:UserService,
        private MiTiendaService:MiTiendaService
    ) {
        const get = JSON.stringify(localStorage.getItem('user_seller'))
        this.user = JSON.parse(JSON.parse(get))
     }

    user:any=[];
    modal_notvalid:boolean=false;
    modal_token:boolean=false;
    
    ngOnInit(): void {
        this.MiTiendaService.getMiTienda(this.user.dealer_id)
        .then(res => {
            console.log(res)
            sessionStorage.setItem('AutosMotosShop', JSON.stringify(res.data))
        }).catch(res=>{
            if(res.status == 401){
                
                this.modal_token=true;
            }
        })
        const get = JSON.stringify(localStorage.getItem('user_seller'))
        this.user = JSON.parse(JSON.parse(get))
        console.log(this.ActivatedRoute)

        
      
        this.UserService.change.subscribe(res => {
            this.user = [];
            const get = JSON.stringify(localStorage.getItem('user_seller'))
            this.user = JSON.parse(JSON.parse(get))
            
        })
    }


    main=false;
    
    modal(){
        if(this.user.status !== 'Aprobado' || this.user.email_verified_at == null){
            this.modal_notvalid =true;
        }else{
            this.ModalsService.toggle()
        }
    }


    logout(){
        sessionStorage.clear()
        localStorage.clear()
        this.route.navigateByUrl('/')
    }

    login(){
        sessionStorage.clear()
        localStorage.clear()
        this.route.navigateByUrl('/login')
    }
}
