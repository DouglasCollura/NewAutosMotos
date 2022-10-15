import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ModalSuccessService } from 'src/app/components/modals-success/modal-success.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-importacion-confirm',
  templateUrl: './importacion-confirm.component.html',
  styleUrls: ['./importacion-confirm.component.scss']
})
export class ImportacionConfirmComponent implements OnInit {

  constructor(
    private route:Router,
    private http:HttpClient,
    private ModalSuccessService:ModalSuccessService
  ) { }

  ngOnInit(): void {
  }


  isLoading:boolean=false;

  fileToUpload:any;
  name='Subir planilla  CSV';
  token = localStorage.getItem('token');

  ChangeFile(event:any){
    const info = event.target.files[0];
    this.name = info.name;

    this.fileToUpload = info;
  }

  async sendFile(){
    this.isLoading = true;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    
    const file = new FormData()
    file.append("file", this.fileToUpload);

    await this.http.post(`${this.url}admin/import/massive`, file, {headers})
    .subscribe(
      (result:any) => {
        this.ModalSuccessService.toggle(1, 'Tu publicación masiva se ha creado y está pendiente de aprobación. Te avisaremos cuando se haya aprobado', 1)
      },
      error => {
        console.log(error)
        this.ModalSuccessService.toggle(2, 'No se ha podido cargar correctamente tu publicación masiva. Asegurate de haberla completado correctamente o vuelve a intentarlo más tarde.', 0)
      }
    );
  }

  url = environment.serverUrl;

  download(){
    window.open(`${this.url}admin/download_csv`);
    setTimeout(() => {
      this.route.navigateByUrl('/seller/importacion-upload')
    }, 1000);
  }
}
