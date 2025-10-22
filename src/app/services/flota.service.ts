import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flota } from '../models/flota.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class FlotaService {

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

  GetFlotas(): Observable<Flota[]> {
    return this.http.get<Flota[]>(
      environment.baseUrlApi +'fleets',
      this.requestOptions
    );
  }

  SaveFlota(data: any) {
    return this.http.post(environment.baseUrlApi + 'fleets', data,
    this.requestOptions);
  }

  DeleteFlota(id: any) {
    return this.http.delete(environment.baseUrlApi + 'fleets/'+ id,
    this.requestOptions);
  }

  UpdateFlota(id:any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'fleets/' + id, data,
      this.requestOptions);
  }
}
