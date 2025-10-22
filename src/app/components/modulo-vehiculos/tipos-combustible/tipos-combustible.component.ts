import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TipoCombustibleFormComponent } from './tipoCombustible-form/tipoCombustible-form.component';
import { TipoCombustibleModFormComponent } from './tipoCombustible-modform/tipoCombustible-modform.component';
import { TipoCombustibleService } from 'src/app/services/tipoCombustible.service';
import { TipoCombustible } from 'src/app/models//tipoCombustible.model';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-combustible',
  templateUrl: './tipos-combustible.component.html',
  styleUrls: ['./tipos-combustible.component.scss'],
})

export class TiposCombustibleComponent {

  tipoCombustibleslist!: TipoCombustible[];
  dataSource: any;
  displayedColumns: string[] = ['name', 'acciones'];
  value = 'Buscar';

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private service: TipoCombustibleService
  ) {
    this.loadTipoCombustibles();
  }

  ngAfterViewInit() {}

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  
  Add() {
    var _dialog = this.dialog.open(TipoCombustibleFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Tipo Combustible',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadTipoCombustibles();
      }
    });
  }

  loadTipoCombustibles() {
    this.service.GetTipoCombustible().subscribe((res: any) => {
      this.tipoCombustibleslist = res.data;
      this.dataSource = new MatTableDataSource<TipoCombustible>(
        this.tipoCombustibleslist
      );
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
        this.service.DeleteTipoCombustible(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino el Tipo Combustible: ' + name,
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación de la Tipo Combustible!',
              'No se ha podido realizar el proceso de eliminación de: ' +
                name,
              'error'
            )
          }
        );
      }
      this.loadTipoCombustibles();
    })
  }

  Mod(id: any, name: any) {
    var _dialog = this.dialog.open(TipoCombustibleModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Tipo Combustible: ' + name,
        id: id,
        name: name,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadTipoCombustibles();
      }
    });
  }
}
