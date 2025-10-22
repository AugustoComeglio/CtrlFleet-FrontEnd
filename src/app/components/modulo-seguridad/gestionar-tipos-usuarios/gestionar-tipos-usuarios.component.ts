import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoUsuarioFormComponent } from './tipoUsuario-form/tipoUsuario-form.component';
import { TipoUsuarioModFormComponent } from './tipoUsuario-modform/tipoUsuario-modform.component';
import { MatDialog } from '@angular/material/dialog';
import { TipoUsuarioService } from 'src/app/services/tipoUsuario.service';
import { TipoUsuario } from 'src/app/models/tipoUsuario.model';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestionar-tipos-usuarios',
  templateUrl: './gestionar-tipos-usuarios.component.html',
  styleUrls: ['./gestionar-tipos-usuarios.component.scss'],
})
export class GestionarTiposUsuariosComponent {
  tipoUsuariolist!: TipoUsuario[];
  dataSource: any;
  displayedColumns: string[] = ['name', 'acciones'];
  value = 'Buscar';
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private service: TipoUsuarioService) {
    this.loadTipoUsuario();
  }

  ngAfterViewInit() {}

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Add() {
    var _dialog = this.dialog.open(TipoUsuarioFormComponent, {
      width: '60%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Tipo Usuario',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadTipoUsuario();
      }
    });
  }

  loadTipoUsuario() {
    this.service.GetTipoUsuario().subscribe((res: any) => {
      this.tipoUsuariolist = res.data;
      this.dataSource = new MatTableDataSource<TipoUsuario>(
        this.tipoUsuariolist
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Delete(id: any, name: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteTipoUsuario(id).subscribe(
          (response) => {
            Swal.fire(
              'Eliminado!',
              'Se elimino el Tipo Usuario: ' + name,
              'success'
            );
            this.loadTipoUsuario();
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación del Tipo Usuario!',
              'No se ha podido realizar el proceso de eliminación de: ' + name,
              'error'
            );
          }
        );
      }
    });
  }

  Mod(id: any, name: any) {
    var _dialog = this.dialog.open(TipoUsuarioModFormComponent, {
      width: '50%',
      maxWidth: '630px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Tipo Usuario: ' + name,
        id: id,
        name: name,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadTipoUsuario();
      }
    });
  }
}
