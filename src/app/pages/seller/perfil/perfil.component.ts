import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalEditProfileService } from 'src/app/components/modal-edit-profile/modal-edit-profile.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    private ModalEditProfileService:ModalEditProfileService,
    private http:HttpClient,
    private UserService:UserService
  ) { 

  }

  user:any=[];
  plan:any=[];
  lastPlan:any;
  damagedImg=true;
  ngOnInit(): void {
    if(localStorage.getItem('user_seller')){
      this.user = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user_seller'))));
    }

    if(localStorage.getItem('last_plan')){
      this.plan = JSON.parse(localStorage.getItem('last_plan'))
    }

    this.userName = this.user.first_name;
    this.lastName = this.user.last_name;
    if(this.user.image == [] || this.user.image == {} || this.user.image == ''){
      this.damagedImg = false;
    }
    this.getPerfil()
  }

  edit:boolean=false;

  saving:boolean=false;

  userName='';
  lastName='';
  image:any;
  
  async save(){
    this.saving = true;
    const formData = new FormData();
    formData.append('first_name', this.userName)
    formData.append('last_name', this.lastName)
    formData.append('image', this.image)
    this.ModalEditProfileService.updateUser(formData)
    .then(res=>{
      this.userName = res.data?.first_name;
      this.lastName = res.data?.last_name;
      this.saving = false;
      this.edit = false;
      this.getPerfil()
    })
  }

  imager=true;
  imageBase:any;

  changeImage(input:any){
    this.edit = true;
    let image = input.target.files[0];
    this.image = input.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(image);
    
    reader.onload = (image:any) => {
      this.imager = false;
      this.imageBase = image.currentTarget.result;
    }
  }

  editShow(){
    this.ModalEditProfileService.toggle(this.user)
  }

  getUpdated(user:any){
    this.user = user;
    localStorage.setItem('user_seller', JSON.stringify(user))
  }


  url = environment.serverUrl;
  token = localStorage.getItem('token');

  async getPerfil(){
    const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.token
    });

    const data = this.http.get(`${this.url}users/info`, {headers}).toPromise();
    data.then((res:any)=>{ 
      console.log(res)
      localStorage.setItem('last_plan', JSON.stringify(res.data.plan_active))
      localStorage.setItem('user_seller', JSON.stringify(res.data.user))
      this.UserService.change_img();
      this.user = res.data.user
    })
  }
}
