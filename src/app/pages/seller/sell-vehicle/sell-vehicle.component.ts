import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
declare var $: any;
import { Vacio, VacioU, SoloLetra, SoloNumero } from '../../../../assets/script/general';
// import { Router} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalSuccessService } from 'src/app/components/modals-success/modal-success.service';
import { ModalsService } from 'src/app/components/modals/modals.service';
import { AdsService } from 'src/app/services/ads/ads.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
@Component({
    selector: 'app-sell-vehicle',
    templateUrl: './sell-vehicle.component.html',
    styleUrls: ['./sell-vehicle.component.scss']
})
export class SellVehicleComponent implements OnInit {

    formDatosVehiculos: FormGroup;
    formDetallesAnuncio: FormGroup;
    formDetallesContacto: FormGroup;
    formCaracteristicas: FormGroup;
    fase: any = 1
    market: any
    marcas: any
    modelos: any
    delete_img: string[] = [];
    characteristics: string[] = [];
    thumbnail: string = '';
    categorias
    subcate = []
    is_moto = false;
    is_camion = false;
    user_imagen_show2: any = [];
    valorCategoria
    is_auto = false;
    is_caravana = false
    generacion: any
    caracterisc = []
    loading: boolean = false;
    carrwheel
    editar = false
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
            make_id: ['', [Validators.required]],
            truck_type: [''],
            vehicle_category_id: ['', [Validators.required]],
            model_id: ['', [Validators.required]],
            first_registration_month: [null],
            first_registration_year: [null],
            matriculacion: ['', [Validators.required]],
            generation_id: [''],
            mileage: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            condition: ['', [Validators.required]],
            exterior_color: ['', [Validators.required]],
            interior_color: [''],
            inspeccion: [''],
            inspection_valid_until_month: [''],
            inspection_valid_until_year: [''],
            additional_vehicle_info: [''],
            ad_fuel_type_id: ['', [Validators.required]],
            ad_transmission_type_id: ['', [Validators.required]],
            ad_drive_type_id: [''],
            engine_displacement: [''],
            power_hp: [''],
            fuel_consumption: [''],
            co2_emissions: [''],
            doors: [''],
            bastidor: [''],
            seats: [''],
            sleeping_places: [''],
            estecampo: ['']



        });




        this.formDetallesAnuncio = this.fb.group({
            // auto_ad_id: [null],
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            market_id: [''],
            youtube_link: [''],
            price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            price_contains_vat: [0],
            eliminated_thumbnail: [0]

        });



        this.formDetallesContacto = this.fb.group({
            // auto_ad_id: [null],

            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            email_address: [null, [Validators.required]],
            zip_code: [null, [Validators.required]],
            city: [null, [Validators.required]],
            country: [null, [Validators.required]],
            address: [null, [Validators.required]],
            mobile_number: [null, [Validators.required]],
            whatsapp_number: [null, [Validators.required]],

        });

        this.formCaracteristicas = this.fb.group({
            sub_characteristic_ids: [null],


        });


        this.activatedRoute.params
            .pipe(
                switchMap(params => {
                    if (params['id']) {
                        this.editar = true
                        return this.ads.GetRentalads(params['id']);
                    } else {
                        return of(null);
                    }
                })
            )
            .subscribe(data => {
                if (data) {

                    this.formDatosVehiculos.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id'])

                    if (JSON.parse(JSON.stringify(data)).data.auto_ad) {
                        this.type = 'auto'
                        this.cargarTipo(this.type)

                        this.Transmission(this.type)
                        this.Fuel(this.type)
                        //   this.Caracteristicas(this.type)
                        this.carWheelDrive(this.type)
                    } else if (JSON.parse(JSON.stringify(data)).data.moto_ad) {
                        this.type = 'moto'
                        this.cargarTipo(this.type)

                        this.Transmission(this.type)
                        this.Fuel(this.type)
                        //   this.Caracteristicas(this.type)
                        this.carWheelDrive(this.type)
                    } else if (JSON.parse(JSON.stringify(data)).data.truck_ad) {
                        this.type = 'truck'
                        //   this.Caracteristicas(this.type)
                        this.cargarTipo(this.type)

                        this.Transmission(this.type)
                        this.Fuel(this.type)

                        this.carWheelDrive(this.type)
                    } else {
                        this.type = 'MOBILE-HOME'
                        this.cargarTipo(this.type)

                        this.Transmission(this.type)
                        this.Fuel(this.type)
                        //   this.Caracteristicas(this.type)
                        this.carWheelDrive(this.type)
                    }

                    if (this.type == 'auto') {
                        console.log("data")
                        console.log(data.data.id)
                        this.formDatosVehiculos.controls['make_id'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['make_id'])
                        this.formDatosVehiculos.controls['model_id'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['model']['id'])
                        this.formDatosVehiculos.controls['id'].setValue(data.data.id)

                        this.Generacion2(JSON.parse(JSON.stringify(data)).data.auto_ad['model']['id'])

                        this.formDatosVehiculos.controls['generation_id'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['generation_id'])
                        this.formDatosVehiculos.controls['vehicle_category_id'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['ad_body_type_id'])

                        this.formDatosVehiculos.controls['condition'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['condition'])

                        let mes
                        if (JSON.parse(JSON.stringify(data)).data.auto_ad['first_registration_month'] < 10) {
                            mes = '0' + JSON.parse(JSON.stringify(data)).data.auto_ad['first_registration_month']
                        } else {
                            mes = JSON.parse(JSON.stringify(data)).data.auto_ad['first_registration_month']
                        }
                        this.formDatosVehiculos.controls['matriculacion'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['first_registration_year'] + '-' + mes + '-' + '12')
                        this.formDatosVehiculos.controls['mileage'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['mileage'])
                        this.formDatosVehiculos.controls['interior_color'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['interior_color'])
                        this.formDatosVehiculos.controls['exterior_color'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['exterior_color'])


                        let mes2
                        if (JSON.parse(JSON.stringify(data)).data.auto_ad['inspection_valid_until_month'] < 10) {
                            mes2 = '0' + JSON.parse(JSON.stringify(data)).data.auto_ad['inspection_valid_until_month']
                        } else {
                            mes2 = JSON.parse(JSON.stringify(data)).data.auto_ad['inspection_valid_until_month']
                        }


                        this.formDatosVehiculos.controls['inspeccion'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['inspection_valid_until_year'] + '-' + mes2 + '-' + '12')
                        this.formDatosVehiculos.controls['additional_vehicle_info'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['additional_vehicle_info'] ? JSON.parse(JSON.stringify(data)).data.auto_ad['additional_vehicle_info'] : '')
                        this.formDatosVehiculos.controls['ad_fuel_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['fuel_type']['id'])
                        // //console.log('este es el combustible',JSON.parse(JSON.stringify(data)).data.auto_ad['fuel_type']['id'])
                        this.formDatosVehiculos.controls['ad_transmission_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['ad_transmission_type_id'])
                        this.formDatosVehiculos.controls['engine_displacement'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['engine_displacement'] ? JSON.parse(JSON.stringify(data)).data.auto_ad['engine_displacement'] : '')
                        this.formDatosVehiculos.controls['fuel_consumption'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['fuel_consumption'] !== '0.00' ? JSON.parse(JSON.stringify(data)).data.auto_ad['fuel_consumption'] : '')
                        this.formDatosVehiculos.controls['doors'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['doors'])
                        this.formDatosVehiculos.controls['ad_drive_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['ad_drive_type_id'])
                        this.formDatosVehiculos.controls['power_hp'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.auto_ad['power_hp']) ? parseInt(JSON.parse(JSON.stringify(data)).data.auto_ad['power_hp']) : '')
                        this.formDatosVehiculos.controls['co2_emissions'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['co2_emissions'] !== '0.00' ? JSON.parse(JSON.stringify(data)).data.auto_ad['co2_emissions'] : '')
                        this.formDatosVehiculos.controls['seats'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['seats'] ? JSON.parse(JSON.stringify(data)).data.auto_ad['seats'] : '')
                        this.formDetallesAnuncio.controls['price'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.auto_ad['price']))
                        if (data.data.auto_ad['price_contains_vat']) {
                            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(1)
                        } else {
                            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(0)
                        }
                        this.formDetallesAnuncio.controls['youtube_link'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['youtube_link'] ? JSON.parse(JSON.stringify(data)).data.auto_ad['youtube_link'] : '')
                        this.formDetallesContacto.controls['first_name'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['first_name'])
                        this.formDetallesContacto.controls['last_name'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['last_name'])
                        this.formDetallesContacto.controls['email_address'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['email_address'])
                        this.formDetallesContacto.controls['zip_code'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['zip_code'])
                        this.formDetallesContacto.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['city'])


                        // this.formDetallesContacto.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
                        this.formDetallesContacto.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['address'])
                        this.formDetallesContacto.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['mobile_number'])
                        this.formDetallesContacto.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['whatsapp_number'])
                        // this.getMarcas(JSON.parse(JSON.stringify(data)).data.auto_ad['category'])
                        this.getModelos(JSON.parse(JSON.stringify(data)).data.auto_ad['make_id'])
                        this.formatFechaRevision()

                        this.formatFecha()


                    } else if (this.type == 'moto') {

                        this.formDatosVehiculos.controls['make_id'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['make_id'])
                        this.formDatosVehiculos.controls['model_id'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['model']['id'])

                        this.Generacion2(JSON.parse(JSON.stringify(data)).data.moto_ad['model']['id'])

                        this.formDatosVehiculos.controls['generation_id'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['generation_id'])
                        this.formDatosVehiculos.controls['vehicle_category_id'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['body_type_id'])
                        this.formDatosVehiculos.controls['id'].setValue(data.data.id)
                        this.formDatosVehiculos.controls['condition'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['condition'])

                        let mes
                        if (JSON.parse(JSON.stringify(data)).data.moto_ad['first_registration_month'] < 10) {
                            mes = '0' + JSON.parse(JSON.stringify(data)).data.moto_ad['first_registration_month']
                        } else {
                            mes = JSON.parse(JSON.stringify(data)).data.moto_ad['first_registration_month']
                        }
                        this.formDatosVehiculos.controls['matriculacion'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['first_registration_year'] + '-' + mes + '-' + '12')
                        this.formDatosVehiculos.controls['mileage'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['mileage'])
                        this.formDatosVehiculos.controls['interior_color'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['interior_color'])
                        this.formDatosVehiculos.controls['exterior_color'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['color'])


                        let mes2
                        if (JSON.parse(JSON.stringify(data)).data.moto_ad['inspection_valid_until_month'] < 10) {
                            mes2 = '0' + JSON.parse(JSON.stringify(data)).data.moto_ad['inspection_valid_until_month']
                        } else {
                            mes2 = JSON.parse(JSON.stringify(data)).data.moto_ad['inspection_valid_until_month']
                        }

                        this.formDatosVehiculos.controls['inspeccion'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['inspection_valid_until_year'] + '-' + mes2 + '-' + '12')
                        this.formDatosVehiculos.controls['additional_vehicle_info'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['additional_vehicle_info'] ? JSON.parse(JSON.stringify(data)).data.moto_ad['additional_vehicle_info'] : '')
                        this.formDatosVehiculos.controls['ad_fuel_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['fuel_type_id'])
                        this.formDatosVehiculos.controls['ad_transmission_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['transmission_type_id'])
                        this.formDatosVehiculos.controls['engine_displacement'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['engine_displacement'] ? JSON.parse(JSON.stringify(data)).data.moto_ad['engine_displacement'] : '')
                        this.formDatosVehiculos.controls['fuel_consumption'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['fuel_consumption'] !== '0.00' ? JSON.parse(JSON.stringify(data)).data.moto_ad['fuel_consumption'] : '')
                        this.formDatosVehiculos.controls['doors'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['doors'])
                        this.formDatosVehiculos.controls['ad_drive_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['drive_type_id'])
                        this.formDatosVehiculos.controls['power_hp'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.moto_ad['power_kw']) ? parseInt(JSON.parse(JSON.stringify(data)).data.moto_ad['power_kw']) : '')
                        this.formDatosVehiculos.controls['co2_emissions'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['co2_emissions'] !== '0.00' ? JSON.parse(JSON.stringify(data)).data.moto_ad['co2_emissions'] : '')
                        this.formDatosVehiculos.controls['seats'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['seats'] ? JSON.parse(JSON.stringify(data)).data.moto_ad['seats'] : '')
                        this.formDetallesAnuncio.controls['price'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.moto_ad['price']))
                        if (data.data.moto_ad['price_contains_vat']) {
                            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(1)
                        } else {
                            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(0)
                        }
                        this.formDetallesAnuncio.controls['youtube_link'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['youtube_link'] ? JSON.parse(JSON.stringify(data)).data.moto_ad['youtube_link'] : '')
                        this.formDetallesContacto.controls['first_name'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['first_name'])
                        this.formDetallesContacto.controls['last_name'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['last_name'])
                        this.formDetallesContacto.controls['email_address'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['email_address'])
                        this.formDetallesContacto.controls['zip_code'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['zip_code'])
                        this.formDetallesContacto.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['city'])

                        // this.formDetallesContacto.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
                        this.formDetallesContacto.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['address'])
                        this.formDetallesContacto.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['mobile_number'])
                        this.formDetallesContacto.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data.moto_ad['whatsapp_number'])
                        // this.getMarcas(JSON.parse(JSON.stringify(data)).data.moto_ad['category'])
                        this.getModelos(JSON.parse(JSON.stringify(data)).data.moto_ad['make_id'])
                        this.formatFechaRevision()

                        this.formatFecha()

                    } else if (this.type == 'truck') {
                        this.formDatosVehiculos.controls['id'].setValue(data.data.id)
                        this.formDatosVehiculos.controls['make_id'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['make_id'])
                        this.formDatosVehiculos.controls['model_id'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['model'])

                        this.Generacion2(JSON.parse(JSON.stringify(data)).data.truck_ad['model']['id'])

                        this.formDatosVehiculos.controls['generation_id'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['generation_id'])

                        this.formDatosVehiculos.controls['truck_type'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['vehicle_category_id'])

                        this.valorCategoria = JSON.parse(JSON.stringify(data)).data.truck_ad['vehicle_category']


                        this.formDatosVehiculos.controls['condition'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['condition'])

                        let mes
                        if (JSON.parse(JSON.stringify(data)).data.truck_ad['first_registration_month'] < 10) {
                            mes = '0' + JSON.parse(JSON.stringify(data)).data.truck_ad['first_registration_month']
                        } else {
                            mes = JSON.parse(JSON.stringify(data)).data.truck_ad['first_registration_month']
                        }
                        this.formDatosVehiculos.controls['matriculacion'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['first_registration_year'] + '-' + mes + '-' + '12')
                        this.formDatosVehiculos.controls['mileage'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['mileage'])
                        this.formDatosVehiculos.controls['interior_color'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['interior_color'])
                        this.formDatosVehiculos.controls['exterior_color'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['exterior_color'])


                        let mes2
                        if (JSON.parse(JSON.stringify(data)).data.truck_ad['inspection_valid_until_month'] < 10) {
                            mes2 = '0' + JSON.parse(JSON.stringify(data)).data.truck_ad['inspection_valid_until_month']
                        } else {
                            mes2 = JSON.parse(JSON.stringify(data)).data.truck_ad['inspection_valid_until_month']
                        }

                        this.formDatosVehiculos.controls['inspeccion'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['inspection_valid_until_year'] + '-' + mes2 + '-' + '12')
                        this.formDatosVehiculos.controls['additional_vehicle_info'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['additional_vehicle_info'] ? JSON.parse(JSON.stringify(data)).data.truck_ad['additional_vehicle_info'] : '')
                        this.formDatosVehiculos.controls['ad_fuel_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['fuel_type']['id'])
                        this.formDatosVehiculos.controls['ad_transmission_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['transmission_type_id'])
                        this.formDatosVehiculos.controls['engine_displacement'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['engine_displacement'] ? JSON.parse(JSON.stringify(data)).data.truck_ad['engine_displacement'] : '')
                        this.formDatosVehiculos.controls['fuel_consumption'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['fuel_consumption'] !== '0.00' ? JSON.parse(JSON.stringify(data)).data.truck_ad['fuel_consumption'] : '')
                        this.formDatosVehiculos.controls['doors'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['doors'])
                        this.formDatosVehiculos.controls['ad_drive_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['drive_type_id'])
                        this.formDatosVehiculos.controls['power_hp'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.truck_ad['power_kw']) ? parseInt(JSON.parse(JSON.stringify(data)).data.truck_ad['power_kw']) : '')
                        this.formDatosVehiculos.controls['co2_emissions'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['co2_emissions'] !== '0.00' ? JSON.parse(JSON.stringify(data)).data.truck_ad['co2_emissions'] : '')
                        this.formDatosVehiculos.controls['seats'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['seats'] ? JSON.parse(JSON.stringify(data)).data.truck_ad['seats'] : '')
                        this.formDetallesAnuncio.controls['price'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.truck_ad['price']))
                        if (data.data.truck_ad['price_contains_vat']) {
                            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(1)
                        } else {
                            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(0)
                        }
                        this.formDetallesAnuncio.controls['youtube_link'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['youtube_link'] ? JSON.parse(JSON.stringify(data)).data.truck_ad['youtube_link'] : '')
                        this.formDetallesContacto.controls['first_name'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['first_name'])
                        this.formDetallesContacto.controls['last_name'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['last_name'])
                        this.formDetallesContacto.controls['email_address'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['email_address'])
                        this.formDetallesContacto.controls['zip_code'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['zip_code'])
                        this.formDetallesContacto.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['city'])

                        // this.formDetallesContacto.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
                        this.formDetallesContacto.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['address'])
                        this.formDetallesContacto.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['mobile_number'])
                        this.formDetallesContacto.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data.truck_ad['whatsapp_number'])
                        // this.getMarcas(JSON.parse(JSON.stringify(data)).data.truck_ad['category'])
                        this.getModelos(JSON.parse(JSON.stringify(data)).data.truck_ad['make_id'])
                        this.formatFechaRevision()

                        this.formatFecha()

                    } else {
                        /**AQUI VA LA CARAVANA */
                        this.formDatosVehiculos.controls['make_id'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['make_id'])
                        this.formDatosVehiculos.controls['model_id'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['custom_model'])
                        this.formDatosVehiculos.controls['id'].setValue(data.data.id)
                        // this.Generacion2(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['model']['id'])

                        this.formDatosVehiculos.controls['generation_id'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['generation'])
                        this.formDatosVehiculos.controls['vehicle_category_id'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['vehicle_category_id'])

                        this.formDatosVehiculos.controls['condition'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['condition'])

                        let mes
                        if (JSON.parse(JSON.stringify(data)).data.mobile_home_ad['first_registration_month'] < 10) {
                            mes = '0' + JSON.parse(JSON.stringify(data)).data.mobile_home_ad['first_registration_month']
                        } else {
                            mes = JSON.parse(JSON.stringify(data)).data.mobile_home_ad['first_registration_month']
                        }
                        this.formDatosVehiculos.controls['matriculacion'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['first_registration_year'] + '-' + mes + '-' + '12')
                        this.formDatosVehiculos.controls['mileage'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['mileage'])
                        this.formDatosVehiculos.controls['interior_color'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['interior_color'])
                        this.formDatosVehiculos.controls['exterior_color'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['exterior_color'])


                        let mes2
                        if (JSON.parse(JSON.stringify(data)).data.mobile_home_ad['inspection_valid_until_month'] < 10) {
                            mes2 = '0' + JSON.parse(JSON.stringify(data)).data.mobile_home_ad['inspection_valid_until_month']
                        } else {
                            mes2 = JSON.parse(JSON.stringify(data)).data.mobile_home_ad['inspection_valid_until_month']
                        }


                        this.formDatosVehiculos.controls['inspeccion'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['inspection_valid_until_year'] + '-' + mes2 + '-' + '12')
                        this.formDatosVehiculos.controls['additional_vehicle_info'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['additional_vehicle_info'] ? JSON.parse(JSON.stringify(data)).data.mobile_home_ad['additional_vehicle_info'] : '')
                        this.formDatosVehiculos.controls['ad_fuel_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['fuel_type_id'])
                        this.formDatosVehiculos.controls['ad_transmission_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['transmission_type_id'])
                        this.formDatosVehiculos.controls['engine_displacement'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['engine_displacement'] ? JSON.parse(JSON.stringify(data)).data.mobile_home_ad['engine_displacement'] : '')
                        this.formDatosVehiculos.controls['fuel_consumption'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['fuel_consumption'] !== '0.00' ? JSON.parse(JSON.stringify(data)).data.mobile_home_ad['fuel_consumption'] : '')
                        this.formDatosVehiculos.controls['doors'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['doors'])
                        this.formDatosVehiculos.controls['ad_drive_type_id'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['drive_type_id'])
                        this.formDatosVehiculos.controls['power_hp'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['power_kw']) ? parseInt(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['power_kw']) : '')
                        this.formDatosVehiculos.controls['co2_emissions'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['co2_emissions'] !== '0.00' ? JSON.parse(JSON.stringify(data)).data.mobile_home_ad['co2_emissions'] : '')
                        this.formDatosVehiculos.controls['seats'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['seats'] ? JSON.parse(JSON.stringify(data)).data.mobile_home_ad['seats'] : '')
                        this.formDatosVehiculos.controls['sleeping_places'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['sleeping_places'] ? JSON.parse(JSON.stringify(data)).data.mobile_home_ad['sleeping_places'] : '')

                        this.formDetallesAnuncio.controls['price'].setValue(parseInt(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['price']))
                        if (data.data.mobile_home_ad['price_contains_vat']) {
                            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(1)
                        } else {
                            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(0)
                        }
                        this.formDetallesAnuncio.controls['youtube_link'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['youtube_link'] ? JSON.parse(JSON.stringify(data)).data.mobile_home_ad['youtube_link'] : '')
                        this.formDetallesContacto.controls['first_name'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['first_name'])
                        this.formDetallesContacto.controls['last_name'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['last_name'])
                        this.formDetallesContacto.controls['email_address'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['email_address'])
                        this.formDetallesContacto.controls['zip_code'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['zip_code'])
                        this.formDetallesContacto.controls['city'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['city'])

                        // this.formDetallesContacto.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
                        this.formDetallesContacto.controls['address'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['address'])
                        this.formDetallesContacto.controls['mobile_number'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['mobile_number'])
                        this.formDetallesContacto.controls['whatsapp_number'].setValue(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['whatsapp_number'])
                        // this.getMarcas(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['category'])
                        this.getModelos(JSON.parse(JSON.stringify(data)).data.mobile_home_ad['make_id'])
                        this.formatFechaRevision()

                        this.formatFecha()

                    }

                    /** Carga edicion de detalle del anuncio */
                    console.log(JSON.parse(JSON.stringify(data)))
                    // this.formDetallesAnuncio.controls['id'].setValue(JSON.parse(JSON.stringify(data)).data['id'])
                    this.formDetallesAnuncio.controls['title'].setValue(JSON.parse(JSON.stringify(data)).data['title'])
                    this.formDetallesAnuncio.controls['description'].setValue(JSON.parse(JSON.stringify(data)).data['description'])
                    this.formDetallesContacto.controls['country'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
                    this.formDetallesAnuncio.controls['market_id'].setValue(JSON.parse(JSON.stringify(data)).data['market_id'])
                    // this.formDetallesAnuncio.controls['shop_ad_id'].setValue(JSON.parse(JSON.stringify(data)).data.auto_ad['id'])
                    // if(JSON.parse(JSON.stringify(data)).data['images'].length>0){
                    // this.user_imagen_show2='https://cdn.autosmotos.es/'+JSON.parse(JSON.stringify(data)).data['thumbnail']
                    // }

                    this.user_imagen_show2 = data.data.images?.slice()
                    this.thumbnail = data.data.thumbnail;


                    JSON.parse(JSON.stringify(data)).data['characteristics'].forEach((element, index) => {

                        this.caracterisc.push(element.id)

                    });

                    this.ads.Caracteristicas(this.type).subscribe(response => {

                        this.caracteristicas = JSON.parse(JSON.stringify(response)).data

                        //console.log('entramos en caracteristicas editar',this.caracteristicas)

                        let myarray1 = this.caracteristicas
                        let myarray2 = this.caracterisc
                        myarray1.forEach((element, index) => {

                            element.sub_characteristics.forEach((element2, index2) => {
                                // //console.log('aquica primer arreglo',element2.id)
                                // //console.log('aquica',this.caracterisc)
                                let element = element2.id
                                if (myarray2.includes(element)) {
                                    //console.log(`coincide '${element}'`)
                                    this.characteristics.push(element)
                                    this.caracteristicas[index].sub_characteristics[index2]['marcado'] = 1
                                }

                            });

                        });
                        //console.log('este es  lo q viene caracteristicas',response)
                    });


                    //console.log('resultado final',this.caracteristicas)
                    // for(let i=0;i<myarray1.length;i++){
                    //   for(let j=0;j<myarray1[i].sub_characteristics.length;j++){
                    //     //console.log('aquica primer arreglo',myarray1[j])
                    //     //console.log('aquica',this.caracterisc)
                    //       let element = myarray1[i].id
                    //       if(myarray2.includes(element)){
                    //           //console.log(`coincide '${element}'`)
                    //       }
                    //   }

                    // }

                    // //console.log('este es la data',data)
                }
            })









    }

    ngOnInit(): void {
        // this.getMarcas('auto')
        this.obtenetMarket()
        if (!this.editar) {
            this.cargarTipo('auto')
            // console.log('aqui entramos',this.editar)
            this.Transmission('auto')
            this.Fuel('auto')
            this.Caracteristicas('auto')
            this.carWheelDrive('auto')
        }


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

    get d() { return this.formDatosVehiculos.controls; }

    get c() { return this.formDetallesAnuncio.controls; }
    get e() { return this.formDetallesContacto.controls; }




    getCategoria(tipo: any) {
        this.categorias = [];
        this.ads.categoria(tipo).subscribe(response => {

            this.categorias = JSON.parse(JSON.stringify(response)).data


            if (this.is_camion && this.editar) {
                //console.log('esto viene del editar',this.valorCategoria)
                //console.log('esta es la categoria',this.categorias)
                //console.log('esta es la subcate',this.subcate)


                const found = this.categorias.filter(element => element.category == this.valorCategoria.category);

                //console.log('esto retornaaaaa',found[0].category)

                this.formDatosVehiculos.controls['vehicle_category_id'].setValue(found[0].category)

                this.ads.subcategoria(found[0].category).subscribe(response => {

                    this.subcate = JSON.parse(JSON.stringify(response)).data
                    // //console.log('este es  lo q viene en subcategorias',this.categorias)


                });
            }


            // //console.log('este es  lo q viene en categorias',this.categorias)




        });
    }


    getCategoriaCaravana(tipo: any) {
        this.categorias = [];
        this.ads.categoriaCaravana(tipo).subscribe(response => {

            this.categorias = JSON.parse(JSON.stringify(response)).data
            // //console.log('este es  lo q viene en categorias',this.categorias)




        });
    }






    getCarroceria(tipo: any) {
        this.categorias = [];
        this.ads.Carroceria(tipo).subscribe(response => {

            this.categorias = JSON.parse(JSON.stringify(response)).data
            // //console.log('este es  lo q viene en categorias',this.categorias)


        });
    }



    subcategorias(evt) {
        // //console.log('esta es  la categoria',evt.target.value)

        this.subcate = []

        this.ads.subcategoria(evt.target.value).subscribe(response => {

            this.subcate = JSON.parse(JSON.stringify(response)).data
            // //console.log('este es  lo q viene en subcategorias',this.categorias)


        });

        // const found = this.categorias.filter(element => element.category == evt.target.value);

        // //console.log('este es el valor',found.internal_name)

        // this.subcate=found
    }

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
    type: any
    transmision: any
    fuel: any
    caracteristicas: any

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

                // //console.log('esto viene en el for',element)

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

            //console.log('este es el country',this.market)

            let userInformation = localStorage.getItem('user_seller')



            if (JSON.parse(userInformation).dealer.country) {
                const found = this.market.filter(element => element.nombre == JSON.parse(userInformation).dealer.country)

                //console.log('esta es la respuesta',found[0].id)
                this.formDetallesContacto.controls['country'].setValue(found[0].id)
            }
            // //console.log('este es  lo q viene',this.market)
        });
    }
    cargarTipo(evt: any) {
        this.formDatosVehiculos.reset();
        this.formCaracteristicas.reset();
        this.formDetallesAnuncio.reset();
        this.user_imagen_show = []
        this.modelos = [];
        this.type = evt;
        this.is_moto = false
        this.is_camion = false
        this.is_auto = false
        this.is_caravana = false
        // //console.log('esta la carga',evt)
        if (evt == 'moto') {

            this.is_moto = true
            this.getCarroceria('MOTO')
        }
        if (evt == 'truck') {
            this.is_camion = true
            this.getCategoria('TRUCK')
            this.formDatosVehiculos.controls.truck_type.clearValidators();
            this.formDatosVehiculos.controls.truck_type.addValidators([

                Validators.required,
            ]);

        }

        if (evt == 'MOBILE-HOME') {
            this.getCategoriaCaravana(evt)
            this.is_caravana = true
        }
        if (evt == 'auto') {
            this.getCarroceria(evt)
            this.is_auto = true
        }
        this.getMarcas(evt)
        if (!this.editar) {

            this.Transmission(evt)
            this.carWheelDrive(evt)
            this.Fuel(evt)
            this.Caracteristicas(evt)
        }

    }


    getMarcas(tipo: any) {
        this.marcas = [];
        this.ads.Marcas(tipo).subscribe(response => {

            this.marcas = JSON.parse(JSON.stringify(response)).data.data
            // //console.log('este es  lo q viene en marcas',response)


        });
    }

    Generacion(evt: any) {
        this.generacion = [];
        this.ads.Generacion(evt.target.value).subscribe(response => {

            this.generacion = JSON.parse(JSON.stringify(response)).data
            console.log("generacion")
            console.log(this.generacion )
            // //console.log('este es  lo q viene',response)


        });
    }

    Generacion2(evt: any) {
        this.generacion = [];
        this.ads.Generacion(evt).subscribe(response => {

            this.generacion = JSON.parse(JSON.stringify(response)).data
            // //console.log('este es  lo q viene',response)


        });
    }

    Transmission(tipo) {
        this.transmision = [];
        this.ads.Transmission(tipo).subscribe(response => {

            this.transmision = JSON.parse(JSON.stringify(response)).data
            // //console.log('este es  lo q viene',response)


        });
    }


    Fuel(tipo) {

        this.fuel = [];
        this.ads.Fuel(tipo).subscribe(response => {

            this.fuel = JSON.parse(JSON.stringify(response)).data
            // //console.log('este es  lo q viene',response)


        });
    }



    obtenerModelo(evt: any) {

        this.getModelos(evt.target.value)

    }

    getModelos(marca: any) {
        this.modelos = [];
        this.ads.Modelos(marca).subscribe(response => {

            this.modelos = JSON.parse(JSON.stringify(response)).data.data
            // //console.log('este es  lo q viene modelos',response)
        });
    }





    Caracteristicas(tipo) {
        this.caracteristicas = [];
        this.ads.Caracteristicas(tipo).subscribe(response => {

            this.caracteristicas = JSON.parse(JSON.stringify(response)).data
            //console.log('este es  lo q viene caracteristicas',response)
        });






    }


    carWheelDrive(tipo) {
        this.carrwheel = [];
        this.ads.carWheelDrive(tipo).subscribe(response => {

            this.carrwheel = JSON.parse(JSON.stringify(response)).data
            // //console.log('este es  lo q viene carwheels')
            // //console.log(JSON.parse(JSON.stringify(response)).data)
        });
    }


    guardarPaso1(fase: any) {
        this.loading = true
        if (this.formDatosVehiculos.valid) {
            this.loading = false
            this.cambiofase(fase)

            // this.ads.addDatosVehiculoVenta(this.formDatosVehiculos.value).subscribe(response => {
            //   if (response) {
            //     //console.log('esta',JSON.parse(JSON.stringify(response)).data)
            //     this.loading=false
            //        this.formDetallesAnuncio.controls['auto_ad_id'].setValue(JSON.parse(JSON.stringify(response)).data.id)
            //        this.formDetallesContacto.controls['auto_ad_id'].setValue(JSON.parse(JSON.stringify(response)).data.id)
            //       // this.formDetallesContacto.controls['shop_ad_id'].setValue(JSON.parse(JSON.stringify(response)).data.id)

            //       this.cambiofase(fase)


            //   } else {

            //   }
            // });
        }
    }

    guardarPaso2(fase: any) {
        this.loading = true
        //if ((this.formDetallesAnuncio.valid && this.user_imagen_show != null)  || (this.formDetallesAnuncio.valid && this.user_imagen_show2!=null)) {
        if (this.formDetallesAnuncio.valid && (this.user_imagen_show.length + this.user_imagen_show2.length > 2 ||
            this.user_imagen_show.length + this.user_imagen_show2.length > 1 && this.thumbnail)) {
            this.loading = false
            this.cambiofase(fase)
            this.error = 0;

            // this.ads.addDetallesAnuncioVenta(this.formDetallesAnuncio.value).subscribe(response => {
            //   if (response) {
            //       //console.log('esta paso 2',response)
            //       this.loading=false
            //       this.cambiofase(fase)
            //       //  this.formDetallesContacto.controls['auto_ad_id'].setValue(JSON.parse(JSON.stringify(response)).data.ad.id)

            //   } else {

            //   }
            // });
        } else {
            this.error = 3;
            this.loading = false;
        }
    }


    guardarPaso3(fase: any) {
        this.loading = true
        if (this.characteristics.length) {

            this.formCaracteristicas.controls.sub_characteristic_ids.setValue(this.characteristics)
            this.loading = false
            this.cambiofase(fase)
            //     this.cambiofase(fase)

            // this.ads.formCaracteristicaVenta(this.formCaracteristicas.value).subscribe(response => {
            //   if (response) {
            //     this.loading=false
            //     this.cambiofase(fase)
            //       //console.log('esta paso 3',response)
            //     // this.modalOpen()
            //     //   this.formDetallesAnuncio.controls['shop_ad_id'].setValue(JSON.parse(JSON.stringify(response)).data.data.id)

            //   } else {
            //     this.loading=false
            //   }
            // });
        } else {
            this.error = 4;
            this.loading = false;
        }
    }


    guardarPaso4() {

        this.formData = new FormData();
        //if(this.user_imagen_show && this.user_imagen_show.blob){
        //if (this.user_imagen_show && this.user_imagen_show.blob) {
        if (this.user_imagen_show.length) {
            for (var i = 0; i < this.user_imagen_show.length; i++) {
                this.formData.append('file-' + i, this.user_imagen_show[i].blob)
            }
        }

        if (this.delete_img.length) {
            for (const del of this.delete_img) {
                this.formData.append("image_ids[]", del);
            }
        }

        if (!this.thumbnail) {
            this.formDetallesAnuncio.controls['eliminated_thumbnail'].setValue(1)
            this.formData.append("eliminated_thumbnail", this.formDetallesAnuncio.controls['eliminated_thumbnail'].value)
        } else {
            this.formDetallesAnuncio.controls['eliminated_thumbnail'].setValue(0)
            this.formData.append("eliminated_thumbnail", this.formDetallesAnuncio.controls['eliminated_thumbnail'].value)
        }


        /* Form 1 */
        this.formData.append("make_id", this.formDatosVehiculos.controls['make_id'].value)
        this.formData.append("truck_type", this.formDatosVehiculos.controls['truck_type'].value)

        this.formData.append("model", this.formDatosVehiculos.controls['model_id'].value)
        this.formData.append("first_registration_month", this.formDatosVehiculos.controls['first_registration_month'].value)
        this.formData.append("first_registration_year", this.formDatosVehiculos.controls['first_registration_year'].value)
        this.formData.append("generation_id", this.formDatosVehiculos.controls['generation_id'].value ? this.formDatosVehiculos.controls['generation_id'].value : '')
        this.formData.append("mileage", this.formDatosVehiculos.controls['mileage'].value)
        this.formData.append("condition", this.formDatosVehiculos.controls['condition'].value)
        this.formData.append("exterior_color", this.formDatosVehiculos.controls['exterior_color'].value)
        this.formData.append("interior_color", this.formDatosVehiculos.controls['interior_color'].value)
        this.formData.append("inspection_valid_until_month", this.formDatosVehiculos.controls['inspection_valid_until_month'].value > 0 ? this.formDatosVehiculos.controls['inspection_valid_until_month'].value : 0)
        this.formData.append("inspection_valid_until_year", this.formDatosVehiculos.controls['inspection_valid_until_year'].value > 0 ? this.formDatosVehiculos.controls['inspection_valid_until_year'].value : 0)
        this.formData.append("additional_vehicle_info", this.formDatosVehiculos.controls['additional_vehicle_info'].value ? this.formDatosVehiculos.controls['additional_vehicle_info'].value : '')



        this.formData.append("engine_displacement", (this.formDatosVehiculos.controls['engine_displacement'].value ? this.formDatosVehiculos.controls['engine_displacement'].value : ''))
        this.formData.append("power_hp", this.formDatosVehiculos.controls['power_hp'].value ? this.formDatosVehiculos.controls['power_hp'].value : 0)
        this.formData.append("fuel_consumption", this.formDatosVehiculos.controls['fuel_consumption'].value ? this.formDatosVehiculos.controls['fuel_consumption'].value : 0)
        this.formData.append("co2_emissions", this.formDatosVehiculos.controls['co2_emissions'].value ? this.formDatosVehiculos.controls['co2_emissions'].value : 0)
        this.formData.append("doors", this.formDatosVehiculos.controls['doors'].value ? this.formDatosVehiculos.controls['doors'].value : 0)
        this.formData.append("bastidor", this.formDatosVehiculos.controls['bastidor'].value)
        this.formData.append("seats", this.formDatosVehiculos.controls['seats'].value ? this.formDatosVehiculos.controls['seats'].value : 0)
        this.formData.append("sleeping_places", this.formDatosVehiculos.controls['sleeping_places'].value > 0 ? this.formDatosVehiculos.controls['sleeping_places'].value : 0)

        if (this.is_caravana) {
            this.formData.append("model_id", '')


        } else {
            this.formData.append("model_id", this.formDatosVehiculos.controls['model_id'].value)
        }



        if (this.is_moto || this.is_camion || this.is_caravana) {
            this.formData.append("fuel_type_id", this.formDatosVehiculos.controls['ad_fuel_type_id'].value)
            this.formData.append("transmission_type_id", this.formDatosVehiculos.controls['ad_transmission_type_id'].value ? this.formDatosVehiculos.controls['ad_transmission_type_id'].value : '')
            this.formData.append("drive_type_id", this.formDatosVehiculos.controls['ad_drive_type_id'].value ? this.formDatosVehiculos.controls['ad_drive_type_id'].value : '')
            this.formData.append("body_type_id", this.formDatosVehiculos.controls['vehicle_category_id'].value)
        } else {
            this.formData.append("ad_fuel_type_id", this.formDatosVehiculos.controls['ad_fuel_type_id'].value)
            this.formData.append("ad_transmission_type_id", this.formDatosVehiculos.controls['ad_transmission_type_id'].value ? this.formDatosVehiculos.controls['ad_transmission_type_id'].value : '')
            this.formData.append("ad_drive_type_id", this.formDatosVehiculos.controls['ad_drive_type_id'].value ? this.formDatosVehiculos.controls['ad_drive_type_id'].value : '')
            this.formData.append("ad_body_type_id", this.formDatosVehiculos.controls['vehicle_category_id'].value)
        }


        if (this.is_camion) {
            this.formData.append("body_type_id", this.formDatosVehiculos.controls['truck_type'].value)
            this.formData.append("vehicle_category_id", this.formDatosVehiculos.controls['truck_type'].value)
        } else {
            this.formData.append("body_type_id", this.formDatosVehiculos.controls['vehicle_category_id'].value)
            this.formData.append("vehicle_category_id", this.formDatosVehiculos.controls['vehicle_category_id'].value)
        }

        this.formData.append("color", this.formDatosVehiculos.controls['exterior_color'].value)
        this.formData.append("fuel_type_id", this.formDatosVehiculos.controls['ad_fuel_type_id'].value)




        /**form 2 */
        this.formData.append("first_name", this.formDetallesContacto.controls['first_name'].value)
        this.formData.append("last_name", this.formDetallesContacto.controls['last_name'].value)
        this.formData.append("email_address", this.formDetallesContacto.controls['email_address'].value)
        this.formData.append("zip_code", this.formDetallesContacto.controls['zip_code'].value)
        this.formData.append("city", this.formDetallesContacto.controls['city'].value)

        // this.formData.append("market_id",this.formDetallesContacto.controls['country'].value)
        this.formData.append("address", this.formDetallesContacto.controls['address'].value)
        this.formData.append("mobile_number", this.formDetallesContacto.controls['mobile_number'].value)
        this.formData.append("whatsapp_number", this.formDetallesContacto.controls['whatsapp_number'].value)



        /**form 3 */
        // this.formData.append("shop_ad_id",this.formDetallesAnuncio.controls['shop_ad_id'].value)
        this.formData.append("title", this.formDetallesAnuncio.controls['title'].value)
        this.formData.append("description", this.formDetallesAnuncio.controls['description'].value)
        this.formData.append("status", '10')

        const found = this.market.filter(element => element.id == this.formDetallesContacto.controls['country'].value);

        console.log('este es el name', found[0].internal_name)

        let nombrete

        if (found[0].internal_name == 'romania') {
            nombrete = 'Rumania'
        } else if (found[0].internal_name == 'spain') {
            nombrete = 'España'
        } else if (found[0].internal_name == 'germany') {
            nombrete = 'Alemania'
        } else if (found[0].internal_name == 'italy') {
            nombrete = 'Italia'
        } else if (found[0].internal_name == 'united_kingdom') {
            nombrete = 'Reino Unido'
        }


        this.formData.append("market_id", this.formDetallesContacto.controls['country'].value)
        this.formData.append("country", nombrete)


        this.formData.append("youtube_link", this.formDetallesAnuncio.controls['youtube_link'].value)
        this.formData.append("price", this.formDetallesAnuncio.controls['price'].value)
        if (this.formDetallesAnuncio.controls['price_contains_vat'].value) {
            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(1)
            this.formData.append("price_contains_vat", this.formDetallesAnuncio.controls['price_contains_vat'].value)
        } else {
            this.formDetallesAnuncio.controls['price_contains_vat'].setValue(0)
            this.formData.append("price_contains_vat", this.formDetallesAnuncio.controls['price_contains_vat'].value)
        }


        /**form 4 */

        // //console.log('caracterisc',this.caracterisc)
        //for (const a of this.caracterisc) {
        for (const char of this.characteristics) {
            this.formData.append("sub_characteristic_ids[]", char);
        }



        // this.formData.append("sub_characteristic_ids",JSON.stringify(this.caracterisc))

        // //console.log('este es el ultimo form',this.formDetallesContacto.value)

        if (this.formDetallesContacto.valid) {

            //console.log('este es el valor',this.formData)

            this.loading = true
            if (this.is_auto) {
                if (!this.editar) {
                    this.ads.formDetallesContactoVentaAuto(this.formData).subscribe(response => {
                        if (response) {
                            this.loading = false
                            // this.cambiofase(fase)

                            this.modalOpen()


                        } else {
                            this.loading = false
                        }
                    });
                } else {
                    this.ads.formDetallesContactoVentaAutoUpdate(this.formDatosVehiculos.controls['id'].value, this.formData).subscribe(response => {
                        if (response) {
                            this.loading = false
                            // this.cambiofase(fase)

                            this.modalOpen()


                        } else {
                            this.loading = false
                        }
                    });
                }
            } else if (this.is_moto) {

                if (!this.editar) {

                    this.ads.formDetallesContactoVentaMoto(this.formData).subscribe(response => {
                        if (response) {
                            this.loading = false


                            this.modalOpen()

                        } else {
                            this.loading = false
                        }
                    });
                } else {
                    this.ads.formDetallesContactoVentaMotoUpdate(this.formDatosVehiculos.controls['id'].value, this.formData).subscribe(response => {
                        if (response) {
                            this.loading = false


                            this.modalOpen()

                        } else {
                            this.loading = false
                        }
                    });
                }
            } else if (this.is_camion) {
                if (!this.editar) {
                    this.ads.formDetallesContactoVentaCamion(this.formData).subscribe(response => {
                        if (response) {
                            this.loading = false


                            this.modalOpen()


                        } else {
                            this.loading = false
                        }
                    });
                } else {
                    this.ads.formDetallesContactoVentaCamionUpdate(this.formDatosVehiculos.controls['id'].value, this.formData).subscribe(response => {
                        if (response) {
                            this.loading = false


                            this.modalOpen()


                        } else {
                            this.loading = false
                        }
                    });
                }
            } else {
                if (!this.editar) {
                    this.ads.formDetallesContactoVentaCaravana(this.formData).subscribe(response => {
                        if (response) {
                            this.loading = false


                            this.modalOpen()


                        } else {
                            this.loading = false
                        }
                    });
                } else {
                    this.ads.formDetallesContactoVentaCaravanaUpdate(this.formDatosVehiculos.controls['id'].value, this.formData).subscribe(response => {
                        if (response) {
                            this.loading = false


                            this.modalOpen()


                        } else {
                            this.loading = false
                        }
                    });
                }
            }


        }
    }

    modalOpen() {
        this.ModalSuccessService.toggle(1, 'Tu anuncio se ha creado y está pendiente de aprobación. Te avisaremos cuando se haya aprobado', 1)
    }

    //?CONTROL==============================================================================

    /* SelectImg() {
        $("#img").trigger("click");
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
        return SoloNumero(data)
    }


    cambiofase(fase: any) {
        this.error = 0;
        this.fase = fase;

        if (fase == 3) {
            //console.log('esta es la fase')
            let myarray1 = this.caracteristicas
            let myarray2 = this.caracterisc
            myarray1.forEach((element, index) => {

                element.sub_characteristics.forEach((element2, index2) => {
                    //console.log('aquica primer arreglo',element2.id)
                    //console.log('aquica',this.caracterisc)
                    let elemente = element2.id
                    myarray2.forEach((element3, ondex) => {

                        if (element3.sub_characteristic_id === elemente) {
                            //console.log(`coincide '${elemente}'`)
                            this.caracteristicas[index].sub_characteristics[index2]['marcado'] = 1
                        }

                    });


                });

            });
        }
    }

    formatFecha() {
        // //console.log('esta es la fecha',this.formDatosVehiculos.controls.matriculacion.value)

        const myArray = this.formDatosVehiculos.controls.matriculacion.value.split("-");

        this.formDatosVehiculos.controls.first_registration_year.setValue(parseInt(myArray[0]))
        this.formDatosVehiculos.controls.first_registration_month.setValue(parseInt(myArray[1]))




    }

    formatFechaRevision() {
        // //console.log('esta es la fecha',this.formDatosVehiculos.controls.inspeccion.value)



        const myArray = this.formDatosVehiculos.controls.inspeccion.value.split("-");
        // //console.log('este es  la fecha de  until year',myArray)

        this.formDatosVehiculos.controls.inspection_valid_until_year.setValue(parseInt(myArray[0]))
        this.formDatosVehiculos.controls.inspection_valid_until_month.setValue(parseInt(myArray[1]))




    }

    checked(id: string) {
        if (this.characteristics.includes(id)) {
            return true
        }
        return false
    }

    agregar(id: any, event: any) {

        //console.log('esta son',ad_id,sub_characteristic_id)
        // let arreglo=
        if (event.target.checked) {
            this.characteristics.push(id);
        } else {
            let removeIndex = this.characteristics.findIndex(item => item === id);
            if (removeIndex !== -1)
                this.characteristics.splice(removeIndex, 1);
        }

        //console.log('este es el arreglo',this.caracterisc)

    }

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

}
