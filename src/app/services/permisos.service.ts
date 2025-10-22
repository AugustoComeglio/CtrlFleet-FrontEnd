import { Injectable } from '@angular/core';
import { permisos } from '../models/permisos.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PermisosService {
  constructor(private http: HttpClient) {}

  GetPermiso(): Observable<permisos[]> {
    return this.http.get<permisos[]>(
      'http://localhost:3700/api/v1/permissions'
    );
  }

  SavePermiso(data: any) {
    console.log(data);
    return this.http.post('http://localhost:3700/api/v1/permissions', data);
  }

  DeletePermiso(id: any) {
    return this.http.delete('http://localhost:3700/api/v1/permissions/' + id);
  }

  UpdatePermiso(id: any, data: any) {
    return this.http.patch(environment.baseUrlApi + 'permissions' + id, data);
  }
}
