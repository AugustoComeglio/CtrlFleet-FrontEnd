import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { marcaVehiculo } from 'src/app/models/marcaVehiculo.models';
import { MarcaFormComponent } from './marca-form/marca-form.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MarcaModFormComponent } from './marca-modform/marca-modform.component';
import { BrandService } from 'src/app/services/marcaVehiculo.service';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss'],
})
export class MarcaComponent {
  modelo = '/modelo';

  marcaslist!: marcaVehiculo[];
  displayedColumns: string[] = ['name', 'acciones'];
  dataSource: any;
  value = 'Buscar';

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private service: BrandService,
    private router: Router,
    ) {
      this.loadBrands();
    }

  ngAfterViewInit() {}

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  loadBrands() {
    this.service.GetBrand().subscribe((res: any) => {
      this.marcaslist = res.data;
      this.dataSource = new MatTableDataSource<marcaVehiculo>(this.marcaslist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Add() {
    var _dialog = this.dialog.open(MarcaFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Marca',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadBrands();
      }
    });
  }

  Mod(id: any, name: any) {
    var _dialog = this.dialog.open(MarcaModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Marca: ' + name,
        id: id,
        name: name,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadBrands();
      }
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
        this.service.DeleteBrand(id).subscribe(
          (response) => {
            Swal.fire('Eliminado!', 'Se elimino la Marca: ' + name, 'success');
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación de la Marca!',
              'No se ha podido realizar el proceso de eliminación de: ' + name,
              'error'
            );
          }
        );
        this.loadBrands();
      }
    });
  }

  Modelos(id: any, name: string) {
    this.router.navigate(['/modelo'], {
      queryParams: { marca_id: id, marca: name },
    });
  }
}
