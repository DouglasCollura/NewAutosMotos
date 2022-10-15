import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { ModalSuccessService } from 'src/app/components/modals-success/modal-success.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-complete-payment',
  templateUrl: './complete-payment.component.html',
  styleUrls: ['./complete-payment.component.scss']
})
export class CompletePaymentComponent implements OnInit {

  user:any=[];
  
  private stripe: Stripe;

  constructor(
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private ModalSuccessService:ModalSuccessService,
    private UserService:UserService
  ) {
    this.plan = this.route.snapshot.paramMap.get('plan')
    this.typePayment = this.route.snapshot.paramMap.get('payment')
   }

  plan:any='';
  error=false;
  textError='';
  url = environment.serverUrl;
  token = localStorage.getItem('token');
  getPlan:any=[];

  async ngOnInit() {
    const get = JSON.stringify(localStorage.getItem('user_seller'))
    this.user = JSON.parse(JSON.parse(get))

    this.stripe = await loadStripe('pk_test_51JuHxvC1D6pFV6NMzfbyupw2IqdVrVnon5awVOTb0HZQ8HzjSJqh9cCiwdWZUpwbvntyhAQ9sdLv5Cz9Og9ltT6G00vS60BfgZ')
    const elements = this.stripe.elements()
    const card = elements.create('card');
    card.mount('#card')

    const button = document.getElementById('button');
    button.addEventListener('click', async(e) => {
      this.loading = false;
      e.preventDefault();
      await this.stripe.createPaymentMethod({
          type: 'card',
          card: card,
          billing_details: {
            "name": "prueba",
            "email": "prueba@prueba.com"
          },
      })
      .then(res=>{
        this.procesarPago(res.paymentMethod.id)
      })
      .catch(err=>{
        this.error = true;
        this.textError = err.error;
      })
    });


    this.UserService.Payment(this.plan).then((res:any)=>{
      this.parametros.value = Number(res.data?.data?.price);
      this.parametros.plan_id = res.data?.data?.id;
      this.parametros.user_id = this.user.id;
    })
 
  }

  typePayment:any='';

  parametros={
    user_id: '',
    currency:'usd',
    value:10,
    plan_id: '',
    paymentMethod:'',
    name:'Joe Doe',
    phone:'4125459173',
    email:'JoeDoe@gmail.com',
    country:'Canada'
  }

  procesarPago(id){
    this.comprar(id)
    .then(res=>{
      this.ModalSuccessService.toggle(1, res.menssage, 2)
    })
  }

  loading=true;
  async comprar(id){
    
    return this.UserService.PaymentStripe(this.parametros).then((res:any)=>{
      return res.data;
    })

  }
  
}
