import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoUnidad } from 'src/app/models/tipoUnidad.model';
import { TipoUnidadFormComponent } from './tipoUnidad-form/tipoUnidad-form.component';
import { MatDialog,MatDialogRef, MatDialogModule,} from '@angular/material/dialog';
import { TipoUnidadModFormComponent } from './tipoUniadad-modform/tipoUnidad-modform.component';
import { TipoUnidadService } from 'src/app/services/tipoUnididad.service';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tipoUnidad',
  templateUrl: './tipoUnidad.component.html',
  styleUrls: ['./tipoUnidad.component.scss'],
})
export class TipoUnidadComponent {

  unidad = '/unidad';

  tipoUnidadList!: TipoUnidad[];
  displayedColumns: string[] = ['name', 'acciones'];
  dataSource: any;
  value = 'Buscar';

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog, 
    private service: TipoUnidadService,
    private router: Router,
    ) {
      this.loadTipoUnidad();
    }


  

  ngAfterViewInit() {}

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  loadTipoUnidad() {
    this.service.GetTipoUnidad().subscribe((res: any) => {
      this.tipoUnidadList = res.data;
      this.dataSource = new MatTableDataSource<TipoUnidad>(
        this.tipoUnidadList
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Add() {
    var _dialog = this.dialog.open(TipoUnidadFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Tipo Unidad',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadTipoUnidad();
      }
    });
  }


  Mod(id: any, name: any){
    var _dialog = this.dialog.open(TipoUnidadModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Tipo Unidad: ' + name,
        id: id,
        name: name,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadTipoUnidad();
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
        this.service.DeleteTipoUnidad(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino el Tipo Unidad: ' + name,
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación del Tipo Unidad!',
              'No se ha podido realizar el proceso de eliminación de: ' +
                name,
              'error'
            )
          }
        );
        this.loadTipoUnidad();
      }
    })
  }

  Unidades(id: any, name: string){
    this.router.navigate(['/unidad'],{queryParams: {unit_type_id: id, tipoUnidad: name}});
  }

}
