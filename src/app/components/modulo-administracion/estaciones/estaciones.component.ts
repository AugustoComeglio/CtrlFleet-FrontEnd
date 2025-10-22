import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EstacionesFormComponent } from './estaciones-form/estaciones-form.component';
import { EstacionesModFormComponent } from './estaciones-modform/estaciones-modform.component';
import { MatDialog } from '@angular/material/dialog';
import { EstacionService } from 'src/app/services/estacion.service';
import { Estacion } from 'src/app/models/estacion.model';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.scss']
})
export class EstacionesComponent {

  estacioneslist!: Estacion[];
  dataSource: any;
  displayedColumns: string[] = ['nombre', 'acciones'];
  value = 'Buscar';

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog, 
    private service: EstacionService
  ) {
    this.loadEstaciones();
  }


  ngAfterViewInit() { }

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Add() {
    var _dialog = this.dialog.open(EstacionesFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Estacion',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadEstaciones();
      }
    });
  }
  
  loadEstaciones() {
    this.service.GetEstaciones().subscribe((res:any) => {
      this.estacioneslist = res.data;
      this.dataSource = new MatTableDataSource<Estacion>(this.estacioneslist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }  


  Delete(id: any, name: string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteEstacion(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino la Estacion: ' + name,
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación de la Estacion!',
              'No se ha podido realizar el proceso de eliminación de: ' +
                name,
              'error'
            )
          }
        );    
      }
      this.loadEstaciones();
    })
  }

  Mod(id: any, name: any) {
    var _dialog = this.dialog.open(EstacionesModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Estacion: ' + name,
        id: id,
        name: name,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadEstaciones();
      }
    });
  }




}
