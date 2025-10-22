import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCombustible } from '../models/tipoCombustible.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class TipoCombustibleService {

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

  GetTipoCombustible(): Observable<TipoCombustible[]> {
    return this.http.get<TipoCombustible[]>(
      environment.baseUrlApi + 'fuel_types',
      this.requestOptions
    );
  }

  SaveTipoCombustible(data: any) {
    return this.http.post(environment.baseUrlApi + 'fuel_types', data,
    this.requestOptions);
  }

  DeleteTipoCombustible(id: any) {
    return this.http.delete(environment.baseUrlApi + 'fuel_types/' + id,
    this.requestOptions);
  }

  UpdateTipoCombustible(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'fuel_types/' + id, data,
      this.requestOptions);
  }
}
