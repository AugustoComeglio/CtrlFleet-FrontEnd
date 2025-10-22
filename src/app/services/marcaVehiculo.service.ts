import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { marcaVehiculo } from '../models/marcaVehiculo.models';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

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

  GetBrand(): Observable<marcaVehiculo[]> {
    return this.http.get<marcaVehiculo[]>(
      environment.baseUrlApi + 'brands',
      this.requestOptions)

  }

  SaveBrand(data: any) {
    return this.http.post(environment.baseUrlApi + 'brands', data,
    this.requestOptions);
  }

  GetBrandbycode(code: any) {
    return this.http.get(environment.baseUrlApi + 'brands/' + code,
    this.requestOptions);
  }

  UpdateBrand(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'brands/' + id, data,
      this.requestOptions);
  }

  DeleteBrand(id: any) {
    return this.http.delete(environment.baseUrlApi + 'brands/'+ id,
    this.requestOptions);
  }


}
