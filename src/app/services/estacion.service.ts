import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estacion } from '../models/estacion.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class EstacionService {

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


  GetEstaciones(): Observable<Estacion[]> {
    return this.http.get<Estacion[]>(
      environment.baseUrlApi + 'gas_stations',
      this.requestOptions
    );
  }

  SaveEstacion(data: any) {
    return this.http.post(environment.baseUrlApi + 'gas_stations', data,
    this.requestOptions);
  }

  DeleteEstacion(id: any) {
    return this.http.delete(environment.baseUrlApi + 'gas_stations/'+ id,
    this.requestOptions);
  }

  UpdateEstacion(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'gas_stations/' + id, data,
      this.requestOptions);
  }
}
