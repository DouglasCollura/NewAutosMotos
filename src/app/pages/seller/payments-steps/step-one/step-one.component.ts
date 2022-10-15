import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaisService } from 'src/app/services/pais/pais.service';
import { StepOneServiceService } from './step-one-service.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {

  @Output() emitOne: EventEmitter<any> = new EventEmitter();

  constructor(
    private StepOneServiceService:StepOneServiceService,
    private fb: FormBuilder,
    private PaisService:PaisService
  ) { }

  form:FormGroup;

  isVisible:boolean=true;
  submitted:boolean=false;

  ngOnInit(): void {
    this.StepOneServiceService.change.subscribe(res=>{
      this.isVisible = res;
    })
    this.StepOneServiceService.close.subscribe(res=>{
      this.isVisible = false;
    })
    this.StepOneServiceService.open.subscribe(res=>{
      this.isVisible = true;
    })

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });

    this.getCountries();
  }

  market:any=[];

  async getCountries(){
    await this.PaisService.Markets()
    .then((res:any)=>{
      this.market = JSON.parse(JSON.stringify(res)).data?.data
      this.market.forEach((element:any,index:any) => {
        if(element.internal_name=='romania'){
            this.market[index]['nombre']='Rumania'
        }else  if(element.internal_name=='spain'){
            this.market[index]['nombre']='España'
        }else  if(element.internal_name=='germany'){
            this.market[index]['nombre']='Alemania'
        }else  if(element.internal_name=='italy'){
            this.market[index]['nombre']='Italia'
        }else  if(element.internal_name=='united_kingdom'){
            this.market[index]['nombre']='Reino Unido'
        }
        
    });
    })
  }

  get g() { return this.form.controls }

  loading:boolean=true;

  continue(){
    this.submitted=true;
    if (this.form.invalid) {
      return;
    }
     
    var object = {
      name: this.form.controls['name'].value,
      email:  this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      country: this.form.controls['country'].value,
      paymentMethod:''
    }

    this.emitOne.emit(object)
    this.StepOneServiceService.onClose()
  }

}
