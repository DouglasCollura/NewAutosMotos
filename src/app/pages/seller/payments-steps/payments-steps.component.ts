import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { StepOneServiceService } from './step-one/step-one-service.service';
import { StepThreeServiceService } from './step-three/step-three-service.service';
import { StepTwoServiceService } from './step-two/step-two-service.service';

@Component({
  selector: 'app-payments-steps',
  templateUrl: './payments-steps.component.html',
  styleUrls: ['./payments-steps.component.scss']
})
export class PaymentsStepsComponent implements OnInit {

  constructor(
    private StepOneServiceService:StepOneServiceService,
    private StepTwoServiceService:StepTwoServiceService,
    private StepThreeServiceService:StepThreeServiceService,
    private route:ActivatedRoute,
  ) { 
    this.plan = this.route.snapshot.paramMap.get('plan')
  }
  plan:any='';
  user:any=[];

  ngOnInit(): void {
    this.getPlan();

    const get = JSON.stringify(localStorage.getItem('user_seller'))
    this.user = JSON.parse(JSON.parse(get))
  }

  url = environment.serverUrl;
  token = localStorage.getItem('token');

  async getPlan(){
    const res = await axios.get(`${this.url}plans/${this.plan}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    });
    this.parametros.value = Number(res.data?.data?.price);
    this.parametros.plan_id = res.data?.data?.id;
    this.parametros.user_id = this.user.id;
  }

  parametros={
    user_id: '',
    currency:'usd',
    value:10,
    plan_id: '',
    paymentMethod:'',
    name:'',
    email:'',
    phone:'',
    country:'',
    typePayment:''
  }


  emitReceipOne(event:any){
    this.parametros.name = event.name;
    this.parametros.email = event.email;
    this.parametros.phone = event.phone;
    this.parametros.country = event.country;

    this.StepTwoServiceService.onOpen()

  }
  
  emitReceipTwo(event:any){
    this.parametros.typePayment = event;
    this.three = true;
    console.log(event)
    setTimeout(() => {
      this.StepThreeServiceService.receipt(this.parametros);
      this.StepThreeServiceService.onOpen();
    }, 200);
  }

  three=false;
}
