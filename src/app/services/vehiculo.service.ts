import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
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

  GetVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(
      environment.baseUrlApi + 'vehicles',
      this.requestOptions
    );
  }

  GetVehiculosByFlota(id: any): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(
      environment.baseUrlApi + 'fleets/' + id + '/vehicles',
      this.requestOptions
    );
  }

  SaveVehiculo(data: any) {
    console.log(data);
    return this.http.post(
      environment.baseUrlApi + 'vehicles',
      data,
      this.requestOptions
    );
  }

  GetVehiculobycode(id: any) {
    return this.http.get(environment.baseUrlApi + 'vehicles/' + id,
    this.requestOptions);
  }

  UpdateVehiculo(id: any, data: any) {
    console.log(data);
    return this.http.patch(
      environment.baseUrlApi + 'vehicles/' + id,
      data,
      this.requestOptions
    );
  }

  DeleteVehiculo(id: any) {
    return this.http.delete(
      environment.baseUrlApi + 'vehicles/' + id,
      this.requestOptions
    );
  }

  GetDataMonitoreo(id: any) {
    return this.http.get(environment.baseUrlApi + 'vehicles/' + id + '/monitoring',
    this.requestOptions); 
  }
}
