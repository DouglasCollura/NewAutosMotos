import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proceso-compra',
  templateUrl: './proceso-compra.component.html',
  styleUrls: ['./proceso-compra.component.scss']
})
export class ProcesoCompraComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private http:HttpClient,
    private router:Router
  ) {
    this.plan = this.route.snapshot.paramMap.get('plan');
    const get = JSON.stringify(localStorage.getItem('user_seller'))
    this.user = JSON.parse(JSON.parse(get))
   }

  user:any=[];
  plan:any='';
  getPlan:any=[];
  
  url = environment.serverUrl;
  async ngOnInit() {
    const res = await axios.get(`${this.url}plans/${this.plan}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    });
    this.getPlan = res.data.data;
  }

  typePayment:string='1';

  parametros={
    user_id: '',
    currency:'usd',
    value: 5,
    plan_id: '',
    name:'Joe Doe',
    phone:'4125459173',
    email:'JoeDoe@gmail.com',
    country:'Canada'
  }

  loading=false;

  payment(){
    this.loading = true;
    if(this.typePayment === '3'){
        this.parametros.plan_id = this.plan;
        this.parametros.user_id = this.user.id;
        this.parametros.value = Number(this.getPlan?.price);
        this.paypal()
    }
    if(this.typePayment === '2'){
      this.router.navigate(['/seller/planes/compra/transfer', this.plan]);
    }
    if(this.typePayment === '1'){
      this.router.navigate(['/seller/planes/compra/confirmar', this.plan]);
    }
  }

  token = localStorage.getItem('token');

  async paypal(){
    const res = await axios.post('https://www.backproduction.autosmotos.es/api/paypal-payments', 
      this.parametros, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    });
    window.location = res.data.href
  }
}