import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepOneServiceService } from '../step-one/step-one-service.service';
import { StepThreeServiceService } from '../step-three/step-three-service.service';
import { StepTwoServiceService } from './step-two-service.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {

  @Output() emitTwo: EventEmitter<any> = new EventEmitter();

  constructor(
    private StepTwoServiceService:StepTwoServiceService,
    private StepOneServiceService:StepOneServiceService,
    private StepThreeServiceService:StepThreeServiceService
  ) { }

  isVisible:boolean=false;
  typePayment:string='1';
  loading:boolean=false;

  ngOnInit(): void {
    this.StepTwoServiceService.change.subscribe(res=>{
      this.isVisible = res;
    })
    this.StepTwoServiceService.close.subscribe(res=>{
      this.isVisible = false;
    })
    this.StepTwoServiceService.open.subscribe(res=>{
      this.isVisible = true;
    })
  }

  back(){
    this.StepTwoServiceService.onClose();
    this.StepOneServiceService.onOpen();
  }

  emit(){
    this.emitTwo.emit(this.typePayment);
    this.StepTwoServiceService.onClose()
  }

}
