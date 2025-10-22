import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroCombustible} from '../models/registroCombustible.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class RegistroCombustibleService {

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

  GetRegistroCombustible(): Observable<RegistroCombustible[]> {
    return this.http.get<RegistroCombustible[]>(
      environment.baseUrlApi + 'fuel_records', this.requestOptions
    );
  }
  GetRegistroCombustibleByVehicle(id: any): Observable<RegistroCombustible[]> {
    return this.http.get<RegistroCombustible[]>(
      environment.baseUrlApi + 'vehicles/' +  id  + '/fuel_records',this.requestOptions
    );
  }

  GetRegistroCombustibleById(id: any) {
    return this.http.get(environment.baseUrlApi + 'fuel_records/'+ id, this.requestOptions);
  }

  SaveRegistroCombustible(data: any) {
    return this.http.post(environment.baseUrlApi + 'fuel_records', data,this.requestOptions);
  }

  DeleteRegistroCombustible(id: any) {
    return this.http.delete(environment.baseUrlApi + 'fuel_records/'+ id,this.requestOptions);
  }

  UpdateRegistroCombustible(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'fuel_records/' + id, data,this.requestOptions);
  }





}
