import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, map } from 'rxjs';
import { LogIn } from '../models/login.model';
import { environment } from 'src/environments/development';
import { CookieService } from 'ngx-cookie-service';
import { Flota } from '../models/flota.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  PostLogin(data: any): Observable<any> {
    return this.http
      .post<LogIn[]>(environment.baseUrl + 'oauth/token', data)
      .pipe(
        map((res: any) => {
          this.cookieService.set('accessToken', res.access_token);
          this.cookieService.set('refreshToken', res.refresh_token);
          this.cookieService.set('user_data_id', res.user_data.id);
          this.cookieService.set('user_data_email', res.user_data.email);
          this.cookieService.set('user_data_type', res.user_data.type);
          console.log('user_Data_id', this.cookieService.get('user_data_id'));
          return res.access_token; // Devuelve el estado de la respuesta
        })
      );
  }

  GetUser(): Observable<Flota[]> {
    return this.http.get<Flota[]>('/fleets');
  }
}
