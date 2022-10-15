import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
declare var $: any;
import { Vacio, VacioU, SoloLetra, SoloNumero, SoloNumeroTelf } from '../../../../assets/script/general';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalSuccessService } from 'src/app/components/modals-success/modal-success.service';
import { ModalsService } from 'src/app/components/modals/modals.service';
import { AdsService } from 'src/app/services/ads/ads.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'app-recambios',
  templateUrl: './recambios.component.html',
  styleUrls: ['./recambios.component.scss']
})
export class RecambiosComponent implements OnInit {

  formDatosVehiculos: FormGroup;
  formDetallesAnuncio: FormGroup;
  formDetallesContacto: FormGroup;
  fase: any = 1
  market: any
  marcas: any
  modelos: any
  user_imagen_show2: any = [];
  delete_img: string[] = [];
  thumbnail: string = '';
  loading: boolean = false;
  editar = false

  type;
  is_moto = false
  is_camion = false
  is_auto = false
  is_caravana = false

  constructor(
    private UserService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ads: AdsService,
    private ModalSuccessService: ModalSuccessService,
    private ModalsService: ModalsService

  ) {
    this.formDatosVehiculos = this.fb.group({
      id: [''],
      category: ['', [Validators.required]],
      make_id: ['', [Validators.required]],
      market_id: [''],
      model_id: [''],
      model: [''],
      manufacturer: [null, [Validators.required]],
      code: [''],
      condition: ['', [Validators.required]],
    });

    this.formDetallesAnuncio = this.fb.group({
      id: [''],
      shop_ad_id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      market_id: [''],
      youtube_link: [''],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1), Validators.maxLength(8)]],
      price_contains_vat: [0],
      eliminated_thumbnail: [0]

    });



    this.formDetallesContacto = this.fb.group({
      id: [''],
      // auto_ad_id: [null],
      // shop_ad_id:[null],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email_address: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      market_id: [''],
      address: ['', [Validators.required]],
      mobile_number: ['', [Validators.required]],
      whatsapp_number: [''],

    });


    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          if (params['id']) {
            return this.ads.GetRentalads(params['id']);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(data => {
        if (data) {
          this.editar = true

          switch (data.data.shop_ad['category']) {
            case 'auto': this.is_auto = true
              break;
            case 'moto': this.is_moto = true
              break;
            case 'truck': this.is_camion = true
              break;
            case 'MOBILE-HOME': this.is_caravana = true
              break;

            default:
              break;
          }

          this.formDatosVehiculos.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id'])
          this.formDatosVehiculos.controls['category'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['category'])
          this.formDatosVehiculos.controls['make_id'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['make_id'])
          this.formDatosVehiculos.controls['model_id'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['model_id'] ? JSON.parse(JSON.stringify(data)).data.shop_ad['model_id'] : '');
          this.formDatosVehiculos.controls['model'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['custom_model'] ? JSON.parse(JSON.stringify(data)).data.shop_ad['custom_model'] : '');
          this.formDatosVehiculos.controls['manufacturer'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['manufacturer'])
          if (JSON.parse(JSON.stringify(data)).data.shop_ad['code'] != null) {
            this.formDatosVehiculos.controls['code'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['code'])
          } else {
            this.formDatosVehiculos.controls['code'].setValue('')
          }

          this.formDatosVehiculos.controls.market_id.setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
          this.formDatosVehiculos.controls['condition'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['condition'])

          // console.log('este es el modelo', JSON.parse(JSON.stringify(data)).data.shop_ad['make_id'])

          this.getMarcas(JSON.parse(JSON.stringify(data)).data.shop_ad['category'])
          this.getModelos(JSON.parse(JSON.stringify(data)).data.shop_ad['make_id'])



          /** Carga edicion de detalle del anuncio */

          this.formDetallesAnuncio.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id'])
          this.formDetallesAnuncio.controls['title'].setValue(JSON.parse(JSON.stringify(data)).data['title'])
          this.formDetallesAnuncio.controls['description'].setValue(JSON.parse(JSON.stringify(data)).data['description'])
          this.formDetallesAnuncio.controls['price'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.shop_ad['price']))
          if (data.data.shop_ad['price_contains_vat']) {
            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(1)
          } else {
            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(0)
          }
          this.formDetallesAnuncio.controls['youtube_link'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['youtube_link'])
          this.formDetallesAnuncio.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
          this.formDetallesAnuncio.controls['shop_ad_id'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['id'])


          // if (JSON.parse(JSON.stringify(data)).data['thumbnail'] != null) {
          this.user_imagen_show2 = data.data.images?.slice()
          this.thumbnail = data.data.thumbnail;
          //this.user_imagen_show2 = 'https://cdn.autosmotos.es/' + JSON.parse(JSON.stringify(data)).data['thumbnail']
          /*           } else {
                      this.user_imagen_show2 = ""
                    } */




          /**Carga la edicion de formDetallesContacto */

          this.formDetallesContacto.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id'])
          // this.formDetallesContacto.controls['auto_ad_id'].setValue(JSON.parse(JSON.stringify(data)).data['auto_ad'])
          // this.formDetallesContacto.controls['shop_ad_id'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['id'])
          this.formDetallesContacto.controls['first_name'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['first_name'])
          this.formDetallesContacto.controls['last_name'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['last_name'])
          this.formDetallesContacto.controls['email_address'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['email_address'])
          this.formDetallesContacto.controls['zip_code'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['zip_code'])
          this.formDetallesContacto.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['city'])
          this.formDetallesContacto.controls['country'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['country'])
          this.formDetallesContacto.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['country'])
          this.formDetallesContacto.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['address'])
          this.formDetallesContacto.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['mobile_number'])
          this.formDetallesContacto.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['whatsapp_number'])


          // this.formAnuncio.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id'])
          // this.formAnuncio.controls['description'].setValue(JSON.parse(JSON.stringify(data)).data['description'])
          // this.formAnuncio.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
          // this.formAnuncio.controls['slug'].setValue(JSON.parse(JSON.stringify(data)).data['slug'])
          // this.formAnuncio.controls['title'].setValue(JSON.parse(JSON.stringify(data)).data['title'])
          // this.formAnuncio.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['address'])
          // this.formAnuncio.controls['user_id'].setValue(JSON.parse(JSON.stringify(data)).data['user_id'])

          // this.formAnuncio.controls['zip_code'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['zip_code'])
          // this.formAnuncio.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['city'])
          // this.formAnuncio.controls['country'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['country'])
          // this.formAnuncio.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['mobile_number'])
          // this.formAnuncio.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['whatsapp_number'])
          // this.formAnuncio.controls['website_url'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['website_url'])
          // this.formAnuncio.controls['email_address'].setValue(JSON.parse(JSON.stringify(data)).data.rental_ad['email_address'])


          // this.user_imagen_show2='https://cdn.autosmotos.es/'+JSON.parse(JSON.stringify(data)).data['images'][0].path
          // this.formAnuncio.controls['type'].setValue(JSON.parse(JSON.stringify(data)).data['type'])
          // this.datosUsuario=JSON.parse(JSON.stringify(data)).data
          // this.toEdit$.next(JSON.parse(JSON.stringify(data)).data);
          // this.formD.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id']);
          // this.formD.controls['first_name'].setValue(JSON.parse(JSON.stringify(data)).data['first_name']);
          // this.formD.controls['email'].setValue(JSON.parse(JSON.stringify(data)).data['email']);
          // this.formD.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data['city']);
          // this.formD.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data['whatsapp_number']);
          // this.formD.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data['mobile_number']);
          // this.formD.controls['country'].setValue(JSON.parse(JSON.stringify(data)).data['country']);
          // this.formD.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data['address']);
          // this.formD.controls['descripcion'].setValue(data['descripcion']);
          // this.formD.controls['precio'].setValue(data['precio']);

          // if(data['videos'].length > 0){
          //   this.videos = data['videos']
          // }

          // console.log('este es la data', data)
        }
      })

  }

  ngOnInit(): void {
    this.obtenetMarket()

    let userInformation = localStorage.getItem('user_seller')

    // //console.log(JSON.parse(userInformation).first_name)


    this.formDetallesContacto.controls['first_name'].setValue(JSON.parse(userInformation).first_name)
    this.formDetallesContacto.controls['last_name'].setValue(JSON.parse(userInformation).last_name)
    this.formDetallesContacto.controls['email_address'].setValue(JSON.parse(userInformation).dealer ? JSON.parse(userInformation).dealer.email_address : JSON.parse(userInformation).email)
    this.formDetallesContacto.controls['zip_code'].setValue(JSON.parse(userInformation).dealer?.zip_code)
    this.formDetallesContacto.controls['city'].setValue(JSON.parse(userInformation).dealer?.city)
    // this.formDetallesContacto.controls['country'].setValue(JSON.parse(userInformation).dealer.city)
    // this.formDetallesContacto.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data.shop_ad['country'])
    this.formDetallesContacto.controls['address'].setValue(JSON.parse(userInformation).dealer?.address)
    this.formDetallesContacto.controls['mobile_number'].setValue(JSON.parse(userInformation).mobile_number)
    this.formDetallesContacto.controls['whatsapp_number'].setValue(JSON.parse(userInformation).whatsapp_number)
  }

  get g() { return this.formDetallesAnuncio.controls; }
  get a() { return this.formDatosVehiculos.controls; }
  get b() { return this.formDetallesContacto.controls; }


  validateNo(e): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  //!DATA=====================================================================
  //?CARGA===================================================================================


  //?GESTION===================================================================================

  dealer: any = {
    company_name: null,
    vat_number: null,
    country: "prueba",
    address: null,
    zip_code: null,
    city: null,
    email_address: null,
    phone_number: null,
    description: null,
    status: 10
  }

  dealer_show: any = {
    name: null,
    country: "prueba",
    address: null,
    zip_code: null,
    city: null,
    email_address: null,
    mobile_number: null,
    whatsapp_number: null,
    dealer_id: null
  }

  user: any = {
    type: 'profesional',
    first_name: null,
    last_name: null,
    email: null,
    zip_code: null,
    password: null,
    password_confirmation: null,

  }


  //?CONTROL===================================================================================

  // fase:number=1;
  user_imagen_show: any = [];
  img_user: any;
  formData = new FormData();
  error: number = 0;


  //!FUNCIONES=============================================================

  //?CARGA=============================================================



  //?GESTION============================================================

  CargarImagen(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      let file = event.target.files[i];

      reader.onload = (e: any) => {
        this.user_imagen_show.push({ img: e.target.result, blob: file });
      }
    }
    /* 
    reader.onload = (e: any) => {
        this.user_imagen_show={img:e.target.result, blob:file};
    }
    this.user_imagen_show2='' */
  }

  obtenetMarket() {

    this.ads.getMarket().subscribe(response => {

      this.market = JSON.parse(JSON.stringify(response)).data.data

      this.market.forEach((element: any, index: any) => {

        // console.log('esto viene en el for', element)

        if (element.internal_name == 'romania') {
          this.market[index]['nombre'] = 'Rumania'
        } else if (element.internal_name == 'spain') {
          this.market[index]['nombre'] = 'España'
        } else if (element.internal_name == 'germany') {
          this.market[index]['nombre'] = 'Alemania'
        } else if (element.internal_name == 'italy') {
          this.market[index]['nombre'] = 'Italia'
        } else if (element.internal_name == 'united_kingdom') {
          this.market[index]['nombre'] = 'Reino Unido'
        }

      });

      let userInformation = localStorage.getItem('user_seller')



      if (JSON.parse(userInformation).dealer.country) {
        const found = this.market.filter(element => element.nombre == JSON.parse(userInformation).dealer.country)

        //console.log('esta es la respuesta',found[0].id)
        this.formDetallesContacto.controls['country'].setValue(found[0].id)
      }
      // console.log('este es  lo q viene', this.market)
    });
  }

  // cargarTipo(evt:any){
  //     console.log('esta la carga',evt.target.value)
  //     this.getMarcas(evt.target.value)
  // }



  cargarTipo(evt: any) {
    this.type = evt.target.value;
    this.is_moto = false
    this.is_camion = false
    this.is_auto = false
    this.is_caravana = false
    this.formDatosVehiculos.controls.make_id.setValue('')
    //this.formDatosVehiculos.controls.model.setValue('')
    this.formDatosVehiculos.controls.model_id.setValue('')
    // console.log('esta la carga', this.type)
    if (this.type == 'moto') {

      this.is_moto = true
      this.formDatosVehiculos.controls.model.clearValidators();
      this.formDatosVehiculos.controls.model_id.clearValidators();
      this.formDatosVehiculos.controls.model_D.addValidators([

        Validators.required,
      ])
      // this.getCarroceria('MOTO')
    }
    if (this.type == 'truck') {
      this.is_camion = true
      this.formDatosVehiculos.controls.model_id.clearValidators();
      this.formDatosVehiculos.controls.model.clearValidators();
      this.formDatosVehiculos.controls.model.addValidators([

        Validators.required,
      ])
      // this.getCategoria('TRUCK')
    }

    if (this.type == 'MOBILE-HOME') {
      // this.getCategoriaCaravana(evt)
      this.is_caravana = true
      this.formDatosVehiculos.controls.model_id.clearValidators();
      this.formDatosVehiculos.controls.model.clearValidators();
      this.formDatosVehiculos.controls.model.addValidators([

        Validators.required,
      ])
    }
    if (this.type == 'auto') {
      // this.getCarroceria(evt)
      this.is_auto = true
      this.formDatosVehiculos.controls.model.clearValidators();
      this.formDatosVehiculos.controls.model_id.clearValidators();
      this.formDatosVehiculos.controls.model_D.addValidators([

        Validators.required,
      ])
    }
    this.getMarcas(this.type)
    // this.Transmission(evt)
    // this.carWheelDrive(evt)
    // this.Fuel(evt)
    // this.Caracteristicas(evt)
  }


  getMarcas(tipo: any) {
    //this.formDatosVehiculos.controls.model.setValue('')
    this.formDatosVehiculos.controls.model_id.setValue('')

    this.ads.Marcas(tipo).subscribe(response => {

      this.marcas = JSON.parse(JSON.stringify(response)).data.data
      // console.log('este es  lo q viene en getmarcas', response)


    });
  }

  obtenerModelo(evt: any) {

    this.getModelos(evt.target.value)

  }

  getModelos(marca: any) {

    this.ads.Modelos(marca).subscribe(response => {

      this.modelos = JSON.parse(JSON.stringify(response)).data.data
      // console.log('este es  lo q viene modelos', response)
    });
  }





  guardarPaso1(fase) {
    this.loading = true
    if (this.formDatosVehiculos.valid) {

      this.loading = false


      this.cambiofase(fase)


    }
  }

  guardarPaso2(fase) {
    // this.loading=true
    if (this.formDetallesAnuncio.valid && (this.user_imagen_show.length + this.user_imagen_show2.length > 2 ||
      this.user_imagen_show.length + this.user_imagen_show2.length > 1 && this.thumbnail)) {

      this.loading = false
      this.cambiofase(fase)
      this.error = 0;

    }else {
      this.error = 3;
      this.loading = false;
    }
  }


  guardarPaso3() {

    /**form numero 1 */
    this.formDetallesContacto.controls['country'].setValue(this.formDetallesContacto.controls.market_id.value)
    // console.log('detale', this.formDetallesContacto.value)

    this.formData.append("id", this.formDatosVehiculos.controls['id'].value)
    this.formData.append("category", this.formDatosVehiculos.controls['category'].value)
    this.formData.append("make_id", this.formDatosVehiculos.controls['make_id'].value)
    this.formData.append("market_id", this.formDatosVehiculos.controls['market_id'].value)


    this.formData.append("model_id", this.formDatosVehiculos.controls['model_id'].value ? this.formDatosVehiculos.controls['model_id'].value : '')
    this.formData.append("model", this.formDatosVehiculos.controls['model'].value ? this.formDatosVehiculos.controls['model'].value : '')






    this.formData.append("manufacturer", this.formDatosVehiculos.controls['manufacturer'].value)
    this.formData.append("code", this.formDatosVehiculos.controls['code'].value)
    this.formData.append("condition", this.formDatosVehiculos.controls['condition'].value)




    /**form numero 2 */

    //if (this.user_imagen_show && this.user_imagen_show.blob) {
    if (this.user_imagen_show.length) {
      //this.formData.append("images",this.user_imagen_show.blob)
      for (var i = 0; i < this.user_imagen_show.length; i++) {
        this.formData.append('file-' + i, this.user_imagen_show[i].blob)
      }
    }

    if (this.delete_img.length) {
      for (var i = 0; i < this.delete_img.length; i++) {
        this.formData.append("image_ids[]", this.delete_img[i]);
      }
    }

    if (!this.thumbnail) {
      this.formDetallesAnuncio.controls['eliminated_thumbnail'].setValue(1)
      this.formData.append("eliminated_thumbnail", this.formDetallesAnuncio.controls['eliminated_thumbnail'].value)
    } else {
      this.formDetallesAnuncio.controls['eliminated_thumbnail'].setValue(0)
      this.formData.append("eliminated_thumbnail", this.formDetallesAnuncio.controls['eliminated_thumbnail'].value)
    }

    this.formData.append("shop_ad_id", this.formDetallesAnuncio.controls['shop_ad_id'].value)
    this.formData.append("title", this.formDetallesAnuncio.controls['title'].value)
    this.formData.append("description", this.formDetallesAnuncio.controls['description'].value)
    this.formData.append("status", '10')
    this.formData.append("market_id", this.formDetallesAnuncio.controls['market_id'].value)


    this.formData.append("youtube_link", this.formDetallesAnuncio.controls['youtube_link'].value)
    this.formData.append("price", this.formDetallesAnuncio.controls['price'].value)
    if (this.formDetallesAnuncio.controls['price_contains_vat'].value) {
      this.formDetallesAnuncio.controls['price_contains_vat'].setValue(1)
      console.log(this.formDetallesAnuncio.controls['price_contains_vat'].value);
      this.formData.append("price_contains_vat", this.formDetallesAnuncio.controls['price_contains_vat'].value)
    } else {
      this.formDetallesAnuncio.controls['price_contains_vat'].setValue(0)
      console.log(this.formDetallesAnuncio.controls['price_contains_vat'].value);
      this.formData.append("price_contains_vat", this.formDetallesAnuncio.controls['price_contains_vat'].value)
    }

    /** form numero 3 */

    this.formData.append("first_name", this.formDetallesContacto.controls['first_name'].value)
    this.formData.append("last_name", this.formDetallesContacto.controls['last_name'].value)
    this.formData.append("email_address", this.formDetallesContacto.controls['email_address'].value)
    this.formData.append("zip_code", this.formDetallesContacto.controls['zip_code'].value)
    this.formData.append("city", this.formDetallesContacto.controls['city'].value)
    this.formData.append("country", this.formDetallesContacto.controls.market_id.value)
    this.formData.append("market_id", this.formDetallesContacto.controls['country'].value)
    this.formData.append("address", this.formDetallesContacto.controls['address'].value)
    this.formData.append("mobile_number", this.formDetallesContacto.controls['mobile_number'].value)
    this.formData.append("whatsapp_number", this.formDetallesContacto.controls['whatsapp_number'].value)



    if (this.formDetallesContacto.valid) {
      this.loading = true


      if (!this.editar) {

        this.ads.formDetallesContacto(this.formData).subscribe(response => {
          if (response) {
            this.loading = false
            // console.log('esta paso 3', response)
            this.modalOpen()
            //   this.formDetallesAnuncio.controls['shop_ad_id'].setValue(JSON.parse(JSON.stringify(response)).data.data.id)

          } else {
            this.loading = false
          }
        });

      } else {
        this.ads.updateformDetallesContacto(this.formDetallesContacto.controls['id'].value, this.formData).subscribe(response => {
          if (response) {
            this.loading = false
            // console.log('esta paso 3', response)
            this.modalOpen()
            //   this.formDetallesAnuncio.controls['shop_ad_id'].setValue(JSON.parse(JSON.stringify(response)).data.data.id)

          } else {
            this.loading = false
          }
        });


      }

    }
  }

  modalOpen() {
    this.ModalSuccessService.toggle(1, 'Tu anuncio se ha creado y está pendiente de aprobación. Te avisaremos cuando se haya aprobado', 1)
  }



  //?CONTROL==============================================================================

  /*   SelectImg() {
      $("#img").trigger("click");
      this.user_imagen_show2 = ''
    } */

  SelectImg(fileInput: HTMLInputElement) {
    fileInput.click();
  }


  Vacio(data: any) {
    return Vacio(data)
  }

  VacioU(data: any) {
    return VacioU(data)
  }

  SoloLetra(data: any) {
    return SoloLetra(data)
  }

  SoloNumero(data: any) {
    return SoloNumeroTelf(data)
  }


  cambiofase(fase: any) {
    this.fase = fase;
  }

  /*   delete() {
      this.user_imagen_show = ''
    } */

  delete(img: any, oldImg?: number) {
    if (oldImg == 1) {
      this.thumbnail = '';

    } else if (oldImg == 2) {
      this.user_imagen_show2.forEach((image: any, index: any, arr: any) => {
        if (image.id == img.id) {
          this.delete_img.push(img.id);
          arr.splice(index, 1);
        }
      });
    } else {
      this.user_imagen_show.forEach((image: any, index: any, arr: any) => {
        if (image == img) {
          arr.splice(index, 1);
        }
      })
    }
  }

  // id dealer e752cbbb-5ba2-4179-b08c-501e95926296
  // "id" con logo:"4c69e9f1-fffd-4169-9130-7b44fecd03a6"

  // id dealer show  c7c3557f-720f-4ca0-9540-91f0f1f5617f

}