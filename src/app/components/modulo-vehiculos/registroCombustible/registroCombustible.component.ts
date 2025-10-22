import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegistroCombustibleService } from 'src/app/services/registroCombustible.service';
import { RegistroCombustible } from 'src/app/models/registroCombustible.model';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroCombustibleFormComponent } from './registroCombustible-form/registroCombustible-form.component';
import { RegistroCombustibleModFormComponent } from './registroCombustible-modform/registroCombustible-modform.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registroCombustible',
  templateUrl: './registroCombustible.component.html',
  styleUrls: ['./registroCombustible.component.scss']
})
export class RegistroCombustibleComponent {

  RegistrosCombustiblelist!: RegistroCombustible[];
  dataSource: any;
  displayedColumns: string[] = ['date', 'quantity', 'unit_price', 'gas_station','acciones'];
  value = 'Buscar';
  title: any
  vehicle_id: any
  plate!: string;


  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private service: RegistroCombustibleService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params:any) =>{
      this.plate = params.license_plate;
      this.title = 'Registro Combustible / ' + params.brand_name + ' / ' + params.model_name + ' / ' + params.license_plate;
      this.vehicle_id = params.id;
    });
    this.loadRegistrosCombustible();
  }

  ngAfterViewInit() {}

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
 
  loadRegistrosCombustible() {
    this.service.GetRegistroCombustibleByVehicle(this.vehicle_id).subscribe((res: any) => {
      this.RegistrosCombustiblelist = res.data;
      this.dataSource = new MatTableDataSource<RegistroCombustible>(
        this.RegistrosCombustiblelist  
      );

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Add() {
    var _dialog = this.dialog.open(RegistroCombustibleFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Registro Combustible',
        vehicle_id: this.vehicle_id,
        plate: this.plate,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadRegistrosCombustible();
      }
    });
  }


  Delete(id: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteRegistroCombustible(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino el Registro de Combustible',
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación del Registro de Combustible!',
              'No se ha podido realizar el proceso de eliminación de',
              'error'
            )
          }
        );
        this.loadRegistrosCombustible();
      }
    })

  }
  
  Mod(id: any ) {
    var _dialog = this.dialog.open(RegistroCombustibleModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Registro Combustible',
        vehicle_id: this.vehicle_id,
        plate: this.plate,
        id: id,

      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadRegistrosCombustible();
      }
    });
  }
}
