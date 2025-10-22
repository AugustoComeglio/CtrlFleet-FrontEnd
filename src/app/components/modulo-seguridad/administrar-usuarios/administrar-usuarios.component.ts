import {
  Component,
  Inject,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  Injectable,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/models/tipoUsuario.model';
import { Usuario } from 'src/app/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TipoUsuarioService } from 'src/app/services/tipoUsuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { AdministrarUsuariosFormComponent } from './administrar-usuarios-form/administrar-usuarios-form.component';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss'],
})
export class AdministrarUsuariosComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private serviceTipoUsuario: TipoUsuarioService,
    private service: UsuarioService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  usuarios: Usuario[] = [];
  tipoUsuarios: TipoUsuario[] = [];
  dataSource: any = null;

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    //this.usuarios.filter = value;
  }

  openpopup() {}

  loadUserTypes() {
    this.serviceTipoUsuario.GetTipoUsuario().subscribe((res: any) => {
      this.tipoUsuarios = res.data;
    });
  }

  loadUsers() {
    this.service.GetUsuario().subscribe((res: any) => {
      console.log(res.data);
      this.usuarios = res.data;
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Add() {
    var _dialog = this.dialog.open(AdministrarUsuariosFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Usuario',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        //this.loadBrands(); //
      }
    });
  }
}

/* registroKilometraje(id: any, plate: any){
  this.router.navigate(['/registroKilometraje'],{queryParams: {vehicle_id: id, license_plate: plate}});
}
registroCombustible(id: any, plate: any){
  this.router.navigate(['/registroCombustible'],{queryParams: {vehicle_id: id, license_plate: plate}});
} */
