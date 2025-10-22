import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoUnidad } from '../models/tipoUnidad.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TipoUnidadService {

  token: string = environment.token;

  constructor(private http: HttpClient, private cookieService: CookieService ) {}

cookieAccessToken = this.cookieService.get('accessToken');
  customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    Authorization: 'Bearer ' + this.cookieAccessToken,
  };
  requestOptions = { headers: new HttpHeaders(this.customHeaders) };

  GetTipoUnidad(): Observable<TipoUnidad[]> {
    return this.http.get<TipoUnidad[]>(
      environment.baseUrlApi + 'unit_types',
      this.requestOptions)

  }

  SaveTipoUnidad(data: any) {
    return this.http.post(environment.baseUrlApi + 'unit_types', data,
    this.requestOptions);
  }

  GetTipoUnidadById(id: any) {
    return this.http.get(environment.baseUrlApi + 'unit_types/' + id,
    this.requestOptions);
  }

  UpdateTipoUnidad(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'unit_types/' + id, data,
      this.requestOptions);
  }

  DeleteTipoUnidad(id: any) {
    return this.http.delete(environment.baseUrlApi + 'unit_types/'+ id,
    this.requestOptions);
  }


}
