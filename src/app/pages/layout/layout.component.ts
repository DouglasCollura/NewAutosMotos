import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
declare var google: any;
declare var $: any;

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss','./layout-mobile.component.scss']
})
export class LayoutComponent implements OnInit,AfterViewInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private route:Router,
        private UserService:UserService

    ) {
        var ua = navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|opera mobile|palmos|webos|Mobile|mobile|googlebot-mobile|CriOS/i.test(ua) || window.innerWidth <= 768)
        {
            this.mobile=true;
        }else{
            this.mobile=false;
        }

        if(localStorage.getItem('user_seller')){
            this.user=JSON.parse(localStorage.getItem('user_seller'))
        }
     }

     ngAfterViewInit() {
        var ua = navigator.userAgent;
        $(window).resize(()=> {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|opera mobile|palmos|webos|Mobile|mobile|googlebot-mobile|CriOS/i.test(ua) || window.innerWidth <= 768)
            {
                this.mobile=true;
            }else{
                this.mobile=false;
            }
        });
        // console.log($('.drop-container')[0].textContent)
        // var firstMenuValue = $('.drop-container')[0].textContent;

        // var check = function () {

        //     if (firstMenuValue != $('.drop-container')[0].textContent) {
        //         firstMenuValue = $('.drop-container')[0].textContent;
        //     }

        // };
        // setInterval(check, 2000);

    }

    ngOnInit(): void {
        this.UserService.change.subscribe(res => {
            this.user=JSON.parse(localStorage.getItem('user_seller'))
        })
    }

    user:any
    main=false;
    mobile:boolean=false;
    menu:boolean=false;
    search:string=""
    handleAddressChange(address: any) {
        console.log(address.formatted_address)
        console.log(address.geometry.location.lat())
        console.log(address.geometry.location.lng())
    }

    display_menu: boolean = true;

        

    GoTo(route: string){
        // this.router.navigate([route])
        location.href = route
    }

    Scroll(){
        console.log("asd")
    }

    logout(){
        sessionStorage.clear()
        localStorage.clear()
        location.reload()
        this.route.navigateByUrl('/')
    }

    dropDown(id:any){
        if($("#"+id).hasClass("down") ){
            $("#"+id).removeClass("down")
        }else{
            $("#"+id).addClass("down")
        }
    }
}
