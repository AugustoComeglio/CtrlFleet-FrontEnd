import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { modeloVehiculo } from '../models/modeloVehiculo.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloService {

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



  GetModelos(): Observable<modeloVehiculo[]> {
    return this.http.get<modeloVehiculo[]>(
      environment.baseUrlApi + 'models'
    );
  }

  SaveModelo(data: any) {
    console.log(data);
    return this.http.post(environment.baseUrlApi + 'models', data,
    this.requestOptions);
  }

  GetModelobycode(code: any) {
    return this.http.get(environment.baseUrlApi + 'models/' + code,
    this.requestOptions);
  }

  UpdateModelo(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'models/' + id, data,
      this.requestOptions);
  }

  DeleteModelo(id: any) {
    return this.http.delete(environment.baseUrlApi + 'models/'+ id,
    this.requestOptions);
  }

  GetModelobyMarca(id: any) {
    return this.http.get<modeloVehiculo[]>(environment.baseUrlApi + 'brands/' + id + '/models',
    this.requestOptions);
  }



}
