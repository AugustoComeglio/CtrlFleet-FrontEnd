import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposito } from '../models/deposito.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DepositoService {

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



  GetDepositos(): Observable<Deposito[]> {
    return this.http.get<Deposito[]>(
      environment.baseUrlApi + 'warehouses',
      this.requestOptions
    );
  }

  SaveDeposito(data: any) {
    return this.http.post(environment.baseUrlApi + 'warehouses', data,
    this.requestOptions);
  }

  DeleteDeposito(id: any) {
    return this.http.delete(environment.baseUrlApi + 'warehouses/'+ id,
    this.requestOptions);
  }

  UpdateDeposito(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi +'warehouses/' + id, data,
      this.requestOptions);
  }
}