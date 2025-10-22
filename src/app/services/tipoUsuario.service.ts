import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoUsuario } from '../models/tipoUsuario.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TipoUsuarioService {
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

  GetTipoUsuario(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>(
      environment.baseUrlApi + 'user_types',
      this.requestOptions
    );
  }

  SaveTipoUsuario(data: any) {
    return this.http.post(
      environment.baseUrlApi + 'user_types',
      data,
      this.requestOptions
    );
  }

  DeleteTipoUsuario(id: any) {
    return this.http.delete(
      environment.baseUrlApi + 'user_types/' + id,
      this.requestOptions
    );
  }

  UpdateTipoUsuario(id: any, data: any) {
    return this.http.patch(
      environment.baseUrlApi + 'user_types/' + id,
      data,
      this.requestOptions
    );
  }

  GetUsuarioByTipoUsuario(id: any): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      environment.baseUrlApi + 'user_types/' + id + '/users',
      this.requestOptions
    );
  }

  AddPermisos(id: any, data: any) {
    return this.http.post(
      environment.baseUrlApi + 'userTypes/' + id + '/add_permission',
      data
    );
  }
}
