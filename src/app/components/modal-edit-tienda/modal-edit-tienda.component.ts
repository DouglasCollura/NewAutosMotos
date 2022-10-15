import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MiTiendaService } from 'src/app/pages/seller/mi-tienda/mi-tienda.service';
import { ModalEditProfileService } from '../modal-edit-profile/modal-edit-profile.service';
import { ModalEditTiendaService } from './modal-edit-tienda.service';

@Component({
  selector: 'app-modal-edit-tienda',
  templateUrl: './modal-edit-tienda.component.html',
  styleUrls: ['./modal-edit-tienda.component.scss']
})
export class ModalEditTiendaComponent implements OnInit {

  @Output() success: EventEmitter<string> = new EventEmitter();
  formTienda:  FormGroup;
  formUser:  FormGroup;

  constructor(
    private ModalEditTiendaService:ModalEditTiendaService, 
    private ModalEditProfileService:ModalEditProfileService,
    private MiTiendaService:MiTiendaService,
    private fb: FormBuilder,
  ) {
   
    this.formTienda = this.fb.group({
      email_address:['', Validators.email],
      address: [''],
      mobile_number: [0],
      whatsapp_number: [0],
      company_name:[''],
      logo_path: [null]
    })
    this.formUser = this.fb.group({
      first_name:['',Validators.required],
      last_name: ['',Validators.required],
      mobile_number: [0,Validators.required],
      whatsapp_number: [0,Validators.required],
      email: ['', Validators.email],
    })
   }

  modal=false;
  negocio:any=[];
  user:any=[];

  get g() { return this.formTienda.controls }
  get u() { return this.formUser.controls }

  ngOnInit(): void {
    this.ModalEditTiendaService.change.subscribe(res=>{
      console.log("usuario")
      console.log(res)
      this.modal = res.isOpen;
      this.negocio = res.negocio;
      this.user = res.user;

      if(this.user.type == 'Ocasional'){
        this.formUser.controls['first_name'].setValue( res.user?.first_name)
        this.formUser.controls['last_name'].setValue( res.user?.last_name)
        this.formUser.controls['mobile_number'].setValue( res.user?.mobile_number)
        this.formUser.controls['whatsapp_number'].setValue( res.user?.whatsapp_number)
        this.formUser.controls['email'].setValue( res.user?.email)
      }else{
        this.formTienda.controls['company_name'].setValue( res.negocio?.name)
        this.formTienda.controls['address'].setValue( res.negocio?.address)
        this.formTienda.controls['mobile_number'].setValue( res.negocio?.mobile_number)
        this.formTienda.controls['whatsapp_number'].setValue( res.negocio?.whatsapp_number)
        this.formTienda.controls['email_address'].setValue( res.negocio?.email_address)
      }

    })
    this.ModalEditTiendaService.run.subscribe(res=>this.modal = res)
  }

  // CIERRA MODAL
  close(){
    this.ModalEditTiendaService.onRun()
  }

  imageR=true;
  imageBase:any;
  image:any;

  UploadImage(input:any){
    let image = input.target.files[0];
    this.image = input.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(image);
    
    reader.onload = (image:any) => {
      console.log(image)
      this.imageR = false;
      this.imageBase = image.currentTarget.result;
    }
  }

  company=''
  address=''
  telefono=''
  whatsapp=''
  email=''

  isLoading=false
  update(){
    this.isLoading=true
    const formData = new FormData();

    formData.append("company_name", this.formTienda.controls['company_name'].value);
    formData.append("address", this.formTienda.controls['address'].value);
    formData.append("mobile_number", this.formTienda.controls['mobile_number'].value);
    formData.append("whatsapp_number", this.formTienda.controls['whatsapp_number'].value);
    formData.append("email_address", this.formTienda.controls['email_address'].value);
    if(this.image){
      
      formData.append("logo_path", this.image);

    }

    this.MiTiendaService.updateTienda(this.negocio?.id, formData)
    .then(res=>{
      this.isLoading=false
      this.emit(res)
    })
    .catch(err=>{
      this.isLoading=false
    })
  }

  updateUser(){
    this.isLoading=true
    const formData = new FormData();
    formData.append("first_name", this.formUser.controls['first_name'].value);
    formData.append("last_name", this.formUser.controls['last_name'].value);
    formData.append("mobile_number", this.formUser.controls['mobile_number'].value);
    formData.append("whatsapp_number", this.formUser.controls['whatsapp_number'].value);
    formData.append("email", this.formUser.controls['email'].value);

    this.ModalEditProfileService.updateUser(formData)
    .then(res=>{
      this.isLoading=false
      this.emit(res)
    })
  }

  emit(data:any){
    this.close()
    this.success.emit(data)
  }
}
