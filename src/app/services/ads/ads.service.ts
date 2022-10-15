import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class AdsService {
    user: any
    constructor(
        private http: HttpClient,
    ){
        this.user = JSON.parse(JSON.stringify(localStorage.getItem('token')));
        console.log('este es el token',this.user)
    }

    url = environment.serverUrl;
    token = localStorage.getItem('token');

    Get(): Promise<any> {
        const send = this.http.get(`${this.url}ads`).toPromise()
        return send;
    }
    
    GetUltimos() {
        const send = this.http.get(`${this.url}auto-ads?orderBy=created_at&orderDirection=desc&per_page=15`).toPromise()
        return send;
    }

    GetCount(filtro:any): Promise<any> {
        const send = this.http.post(`${this.url}ads/count_search_advanced`,filtro).toPromise()
        return send;
    }

    GetReviews(id:any): Promise<any> {
        const send = this.http.get(`${this.url}reviews?filters[ad_id]=${id}`).toPromise()
        return send;
    }

    SendReview(review:any): Promise<any> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        const send = this.http.post(`${this.url}reviews`,review,{headers}).toPromise()
        return send;
    }

    FindSearch(type,filter:any,page:any=1): Promise<any> {
        const send = this.http.post(`${this.url}${type}-ads/search/like?page=${page}`,filter).toPromise()
        return send;
    }

    SearchAll(res:any,page:any=1): Promise<any> {
         
        const send = this.http.post(`${this.url}ads/search_ads_like?type=all&&page=${page}`,res).toPromise()
        return send;
    }

    getMarket(){
        // api/markets
        return this.http.get<any[]>(`${this.url}markets`, {});
    }

    

    GetById(id:string): Promise<any> {
        const send = this.http.get(`${this.url}ads/${id}`).toPromise()
        return send;
    }

    add(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}rental-ads`, params,{headers});
    }

    
    GetRentalads(id:any): Promise<any> {
        const send = this.http.get(`${this.url}ads/${id}`).toPromise()
        return send;
    }

    addMechanic(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}mechanic-ads`, params,{headers});
    }

    addMechanicUpdate(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}mechanic-ads/${id}`, params,{headers});
    }

    addAlquilerUpdate(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}rental-ads/${id}`, params,{headers});
    }

    addDatosVehiculo(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
    return this.http.post(`${this.url}shop-ads/principal_data`, params,{headers});
    }

    
    updateDatosVehiculo(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
    return this.http.post(`${this.url}shop-ads/principal_data/${id}`, params,{headers});
    }


    addDatosVehiculoVenta(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}auto-ads/principal_data`, params,{headers});
        }

    

    addDetallesAnuncio(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}shop-ads/details_ads`, params,{headers});
    }

    updateDetallesAnuncio(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}shop-ads/details_ads/${id}`, params,{headers});
    }


    addDetallesAnuncioVenta(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}auto-ads/details_ads`, params,{headers});
        }
    
    formDetallesContacto(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}shop-ads`, params,{headers});
    }


    updateformDetallesContacto(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}shop-ads/${id}`, params,{headers});
    }


    formCaracteristicaVenta(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}auto-ads/add_sub_characteristic_ads`, params,{headers});
    }

    formDetallesContactoVentaAuto(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}auto-ads`, params,{headers});
    }

    formDetallesContactoVentaAutoUpdate(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}auto-ads/${id}`, params,{headers});
    }

    formDetallesContactoVentaCaravana(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}mobile-home-ads`, params,{headers});
    }

    formDetallesContactoVentaCaravanaUpdate(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}mobile-home-ads/${id}`, params,{headers});
    }

    formDetallesContactoVentaMoto(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}moto-ads`, params,{headers});
    }

    formDetallesContactoVentaMotoUpdate(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}moto-ads/${id}`, params,{headers});
    }

    formDetallesContactoVentaCamion(params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}truck-ads`, params,{headers});
    }

    formDetallesContactoVentaCamionUpdate(id,params: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        return this.http.post(`${this.url}truck-ads/${id}`, params,{headers});
    }
    

    

    filter(filtro:any,page:any): Promise<any> {
        const send = this.http.post(`${this.url}ads/search_advanced?page=${page}`,filtro).toPromise()
        return send;
    }

    Marcas(type:string) {

        return this.http.get(`${this.url}makes?orderBy=name&orderDirection=asc&filters[ad_type]=${type}&per_page=500`)
       
    }

    Modelos(id:any){
        return this.http.get(`${this.url}models?orderBy=name&orderDirection=asc&filters[make_id]=${id}&per_page=500`)
        
    }

    Generacion(id:any){
        return this.http.get(`${this.url}generations?all=true&filters[model_id]=${id}`)
        
    }


    Transmission(tipo:any){
        return this.http.get(`${this.url}car-transmission-types?all=true&filters[ad_type]=${tipo}`)  
    }

    Fuel(tipo:any){
        return this.http.get(`${this.url}car-fuel-types?all=true&filters[ad_type]=${tipo}`)  
    }

    Caracteristicas(tipo:any){
        return this.http.get(`${this.url}characteristics?all=true&filters[ad_type]=${tipo}`)  
    }

    categoria(tipo:any){
        // https://www.backproduction.autosmotos.es/api/vehicle-categories/category?filters[ad_type]=truck
        return this.http.get(`${this.url}vehicle-categories/category?all=true&filters[ad_type]=${tipo}`)  
    }

    categoriaCaravana(tipo:any){
        // https://www.backproduction.autosmotos.es/api/vehicle-categories/category?filters[ad_type]=truck
        return this.http.get(`${this.url}vehicle-categories?all=true&filters[ad_type]=${tipo}`)  
    }

    subcategoria(tipo:any){
    
        return this.http.get(`${this.url}vehicle-categories?all=true&filters[category]=${tipo}`)  
    }

  


    carWheelDrive(tipo:any){
        // api/markets
        return this.http.get<any[]>(`${this.url}car-wheel-drive-types?all=true&filters[ad_type]=${tipo}`, {});
    }

    Carroceria(tipo:any){
        // const send = this.http.get(`${this.url}car-body-types?all=true&filters[ad_type]=${type}`).toPromise()
        return this.http.get<any[]>(`${this.url}car-body-types?all=true&filters[ad_type]=${tipo}`, {});
    }

    
}
