import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalSuccessService } from 'src/app/components/modals-success/modal-success.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private http:HttpClient,
    private ModalSuccessService:ModalSuccessService
  ) { 
    this.plan = this.route.snapshot.paramMap.get('plan')
  }

  plan:any='';
  url = environment.serverUrl;
  token = localStorage.getItem('token');
  
  user:any=[];

  ngOnInit(): void {
    const get = JSON.stringify(localStorage.getItem('user_seller'))
    this.user = JSON.parse(JSON.parse(get))
  }


  textbtn='subir comprobante';
  file:any;

  changeImage(image:any){
    this.textbtn =  image.target.files[0].name;
    this.file = image.target.files[0];
  }

  loading=false;
  error=false;

  save(){
    this.loading = true;

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

    const formData = new FormData();
    formData.append('plan_id', this.plan);
    formData.append('user_id', this.user.id);
    formData.append('file', this.file)

    const res = this.http.post(`${this.url}receipts`, formData, {headers}).toPromise()
    
    res.then(()=>{
      this.loading = false;
      this.ModalSuccessService.toggle(1, 'Comprobante enviado correctamente.', 2)
    })
    res.catch(()=>{
      this.loading = false;
      this.error = true;
    })
  }
}
