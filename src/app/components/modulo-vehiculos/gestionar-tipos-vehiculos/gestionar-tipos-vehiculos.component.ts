import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoVehiculoFormComponent } from './tipoVehiculo-form/tipoVehiculo-form.component';
import { TipoVehiculoModFormComponent } from './tipoVehiculo-modform/tipoVehiculo-modform.component';
import { MatDialog } from '@angular/material/dialog';
import { TipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { TipoVehiculo } from 'src/app/models/tipoVehiculo.model';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-tipos-vehiculos',
  templateUrl: './gestionar-tipos-vehiculos.component.html',
  styleUrls: ['./gestionar-tipos-vehiculos.component.scss'],
})
export class GestionarTiposVehiculosComponent implements AfterViewInit {
  tipoVehiculoslist!: TipoVehiculo[];
  dataSource: any;
  displayedColumns: string[] = ['name', 'acciones'];
  value = 'Buscar';
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private service: TipoVehiculoService) {
    //PARA QUE LOS CARGUE EL BACK
    this.loadTipoVehiculo();
  }

  ngAfterViewInit() {}

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Add() {
    var _dialog = this.dialog.open(TipoVehiculoFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Tipo Vehiculo',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadTipoVehiculo();
      }
    });
  }

  loadTipoVehiculo() {
    this.service.GetTipoVehiculo().subscribe((res: any) => {
      this.tipoVehiculoslist = res.data;
      this.dataSource = new MatTableDataSource<TipoVehiculo>(
        this.tipoVehiculoslist
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  Mod(id: any, name: any) {
    var _dialog = this.dialog.open(TipoVehiculoModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Tipo Vehiculo: ' + name,
        id: id,
        name: name,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadTipoVehiculo();
      }
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
        this.service.DeleteTipoVehiculo(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino el Tipo Vehículo: ' + name,
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación de la Tipo Vehículo!',
              'No se ha podido realizar el proceso de eliminación de: ' +
                name,
              'error'
            )
          }
        );
        this.loadTipoVehiculo();
      }
    })
  }






}
