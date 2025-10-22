import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from '../models/unidad.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {

  token: string = environment.token;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  cookieAccessToken = this.cookieService.get('accessToken');
  customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    Authorization: 'Bearer ' + this.cookieAccessToken,
  };
  requestOptions = { headers: new HttpHeaders(this.customHeaders) };



  GetUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(
      environment.baseUrlApi + 'models'
    );
  }

  SaveUnidad(data: any) {
    console.log(data);
    return this.http.post(environment.baseUrlApi + 'units', data,
    this.requestOptions);
  }

  GetUnidadById(id: any) {
    return this.http.get(environment.baseUrlApi + 'units/' + id,
    this.requestOptions);
  }

  UpdateUnidad(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'units/' + id, data,
      this.requestOptions);
  }

  DeleteUnidad(id: any) {
    return this.http.delete(environment.baseUrlApi + 'units/'+ id,
    this.requestOptions);
  }

  GetUnidadByTipoUnidad(id: any) {
    return this.http.get<Unidad[]>(environment.baseUrlApi + 'unit_types/' + id + '/units',
    this.requestOptions);
  }


}
