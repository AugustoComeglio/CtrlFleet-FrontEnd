import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FlotaFormComponent } from './flota-form/flota-form.component';
import { FlotaModFormComponent } from './flota-modform/flota-modform.component';
import { MatDialog } from '@angular/material/dialog';
import { FlotaService } from 'src/app/services/flota.service';
import { Flota } from 'src/app/models/flota.model';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-flotas',
  templateUrl: './gestionar-flotas.component.html',
  styleUrls: ['./gestionar-flotas.component.scss'],
})

export class GestionarFlotasComponent implements AfterViewInit {

  flotaslist!: Flota[];
  dataSource: any;
  displayedColumns: string[] = ['nombre', 'codigo', 'cantidad', 'acciones'];
  value = 'Buscar';

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog, 
    private service: FlotaService
  ) {
    this.loadFlotas();
  }


  ngAfterViewInit() { }

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Add() {
    var _dialog = this.dialog.open(FlotaFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Flota',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadFlotas();
      }
    });
  }
  
  loadFlotas() {
    this.service.GetFlotas().subscribe((res:any) => {
      this.flotaslist = res.data;
      this.dataSource = new MatTableDataSource<Flota>(this.flotaslist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }  


  Mod(id: any, name: any, code: any) {
    var _dialog = this.dialog.open(FlotaModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Flota: ' + name,
        id: id,
        name: name,
        code: code,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadFlotas();
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
        this.service.DeleteFlota(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino la Flota: ' + name,
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación de la Flota!',
              'No se ha podido realizar el proceso de eliminación de: ' +
                name,
              'error'
            )
          }
        );
        this.loadFlotas();
      }
    })
  }
}
