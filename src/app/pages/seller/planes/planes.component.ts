import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalConfirmPlanService } from 'src/app/components/modal-confirm-plan/modal-confirm-plan.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private ModalConfirmPlanService:ModalConfirmPlanService,
    private router:Router
  ) { }

  user:any=[];
  plans:any=[];
  actualPlan:any=[];

  url = environment.serverUrl;
  token = localStorage.getItem('token')
  type='';

  loading=true;
  error=false;

  ngOnInit(): void {
    const get = JSON.stringify(localStorage.getItem('user_seller'))
    this.user = JSON.parse(JSON.parse(get))
    this.type = this.user.type;
    this.actualPlan = JSON.parse(localStorage.getItem('last_plan'));
    
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    
    this.http.get(`${this.url}plans?all=true&filters[type]=${this.type}`, {headers})
    .subscribe(
      (res:any)=>{
        this.loading = false;
        this.plans = res.data
      },
      (err:any )=>{
        this.loading = false;
        this.error = true;
    });
  }
  

  linkonShop:any;

  onShop(id:any){
    this.linkonShop = id;
    if(this.user.type !== 'Ocasional'){
      if(this.actualPlan){
        this.ModalConfirmPlanService.toggle();
      }else{
        this.router.navigateByUrl('/seller/planes/compra/' + id)
      }
    }else{
      this.router.navigateByUrl('/seller/planes/compra/' + id)

    }
    
  }

  emitonShop(){
    console.log('asdasdsa')
    this.router.navigateByUrl('/seller/planes/compra/' + this.linkonShop)
  }
}
