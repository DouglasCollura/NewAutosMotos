import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalHelpService } from 'src/app/components/modal-help/modal-help.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.scss']
})
export class ImportacionComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private route:Router,
    private ModalHelpService:ModalHelpService
  ) { }

  ngOnInit(): void {
  }


  url = environment.serverUrl;

  download(){
    window.open(`${this.url}admin/download_csv`);
    setTimeout(() => {
      this.route.navigateByUrl('/seller/importacion-upload')
    }, 1000);
  }

  show(){
    this.ModalHelpService.toggle()
  }
}
