import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { ModalSuccessService } from 'src/app/components/modals-success/modal-success.service';
import { environment } from 'src/environments/environment';
import { StepTwoServiceService } from '../step-two/step-two-service.service';
import { StepThreeServiceService } from './step-three-service.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {
  private stripe: Stripe;

  constructor(
    private StepThreeServiceService:StepThreeServiceService,
    private ModalSuccessService:ModalSuccessService,
    private http:HttpClient,
    private StepTwoServiceService:StepTwoServiceService
  ) { }

  isVisible:boolean=false;

  information:any=[];
  loading:boolean = true;
  error:boolean = false;
  url = environment.serverUrl;
  token = localStorage.getItem('token');

  textError='';
  loadingPaypal=false;
  
  ngOnInit(): void{
    this.StepThreeServiceService.change.subscribe(res=>{
      this.isVisible = res;
    })
    this.StepThreeServiceService.receptorInfo.subscribe(res=>{
      this.information = res;
      if(res.typePayment == '1'){
        setTimeout(() => {
          this.geter()
        }, 500);
      }

      if(res.typePayment == '3'){
        this.paypal()
      }
    })
    this.StepThreeServiceService.close.subscribe(res=>{
      this.isVisible = false;
    })
    this.StepThreeServiceService.open.subscribe(res=>{
      this.isVisible = true;
    })
  }

  async paypal(){
    this.loadingPaypal = true;

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });


    const response =  this.http.post('https://www.backproduction.autosmotos.es/api/paypal-payments', this.information, {headers}).toPromise()
    response.then((res:any)=>{
      window.location = res.href
    })
    response.catch(err=>{
      this.loadingPaypal = false;
    })
    // const res = await axios.post('https://www.backproduction.autosmotos.es/api/paypal-payments', 
    //   this.information, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + this.token
    //   }
    // });
  }

  async geter(){
    this.stripe = await loadStripe('pk_test_51JuHxvC1D6pFV6NMzfbyupw2IqdVrVnon5awVOTb0HZQ8HzjSJqh9cCiwdWZUpwbvntyhAQ9sdLv5Cz9Og9ltT6G00vS60BfgZ')
    const elements = this.stripe.elements()
    var card = elements.create('cardNumber', {
        'placeholder': 'Número de tarjeta',
    });
    card.mount('#card-number');
    // CVC
    var cvc = elements.create('cardCvc', {
        'placeholder': 'xxx',
    });
    cvc.mount('#card-cvc');

    // Card expiry
    var exp = elements.create('cardExpiry', {
        'placeholder': 'xx/xx',
    });
    exp.mount('#card-exp');

    const button = document.getElementById('button');
    button.addEventListener('click', async(e) => {
      this.loading = false;
      e.preventDefault();
      console.log(this.information)
      await this.stripe.createPaymentMethod({
          type: 'card',
          card: card,
          billing_details: {
            "name": "prueba",
            "email": "prueba@prueba.com"
          },
      })
      .then(res=>{
        console.log(res)
        this.procesarPago(res.paymentMethod.id)
      })
      .catch(err=>{
        this.loading=false;
        console.log(err)
        this.error = true;
        this.textError = err.error;
      })
    });
  }

  procesarPago(id){
    this.comprarStripe(id)
    .then(res=>{
      this.ModalSuccessService.toggle(1, res.menssage, 2)
    })
    .catch(res=>{
      this.loading = true;
      this.ModalSuccessService.toggle(2, 'Ocurrio un error al realizar el pago', 0)
    })
  }

  async comprarStripe(id){
    this.information.paymentMethod = id;

    const res = await axios.post('https://www.backproduction.autosmotos.es/api/stripe-payments', 
      this.information, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    });
    return res.data;
  }

  buttonDis:boolean=false;
  save(){
    this.loadingComprobante = true;

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

    const formData = new FormData();
    formData.append('plan_id', this.information.plan_id);
    formData.append('user_id', this.information.user_id);
    formData.append('name', this.information.name);
    formData.append('phone', this.information.phone);
    formData.append('email', this.information.email);
    formData.append('country', this.information.country);
    formData.append('file', this.file);


    const res = this.http.post(`${this.url}receipts`, formData, {headers}).toPromise()
    
    res.then(()=>{
      this.buttonDis=true;
      this.loadingComprobante = false;
      this.file =  [];
      this.ModalSuccessService.toggle(1, 'Comprobante enviado correctamente.', 2)
    })
    res.catch((error:any)=>{
      this.loadingComprobante = false;
      this.error = true;
    })
  }
  

  textbtn='subir comprobante';
  file:any=undefined;

  loadingComprobante:boolean=false;
  changeImage(image:any){
    this.textbtn =  image.target.files[0].name;
    this.file = image.target.files[0];
  }

  view(){
    console.log(this.information)
  }

  back(){
    this.StepThreeServiceService.onClose();
    this.StepTwoServiceService.onOpen();
  }
}
