import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user.model';
import { environment } from 'src/environments/development';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  GetUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:3700/api/v1/users');
  }

  SaveUsuario(data: any) {
    console.log(data);
    return this.http.post('http://localhost:3700/api/v1/users', data);
  }

  DeleteUsuario(id: any) {
    return this.http.delete('http://localhost:3700/api/v1/users/' + id);
  }

  UpdateUsuario(id: any, data: any) {
    return this.http.patch(environment.baseUrlApi + 'users/' + id, data);
  }
}
