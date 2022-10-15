import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalHelpService } from './modal-help.service';

@Component({
  selector: 'app-modal-help',
  templateUrl: './modal-help.component.html',
  styleUrls: ['./modal-help.component.scss']
})
export class ModalHelpComponent implements OnInit {

  constructor(
    private ModalHelpService:ModalHelpService,
    private route:Router
  ) { }

  url = environment.serverUrl

  ngOnInit(): void {
    this.ModalHelpService.change.subscribe(res=>{
      this.modal = res
    })
  }

  close(){
    this.ModalHelpService.toggle()
  }

  modal=false;

  download(){
    window.open(`${this.url}admin/download_csv`);
    this.ModalHelpService.toggle()
  }
}
