import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoVehiculo } from '../models/tipoVehiculo.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TipoVehiculoService {

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


  GetTipoVehiculo(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(
      environment.baseUrlApi + 'vehicle_types',
      this.requestOptions
    );
  }

  SaveTipoVehiculo(data: any) {
    return this.http.post(environment.baseUrlApi + 'vehicle_types', data,
    this.requestOptions);
  }

  DeleteTipoVehiculo(id: any) {
    return this.http.delete(environment.baseUrlApi + 'vehicle_types/' + id,
    this.requestOptions);
  }

  UpdateTipoVehiculo(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'vehicle_types/' + id, data,
      this.requestOptions);
  }

}
