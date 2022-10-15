import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalsService } from './modals.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  constructor(
    private ModalsService:ModalsService,
    private router:Router
  ) { }

  modal=false
  ngOnInit(): void {
    this.ModalsService.change.subscribe(res=>{
      this.modal = res
      this.type=1
    })
    this.type=1
  }


  close(){
    this.ModalsService.toggle()
  }

  titleModal='¿Qué tipo de anuncio crearás?';
  type=1;
}
