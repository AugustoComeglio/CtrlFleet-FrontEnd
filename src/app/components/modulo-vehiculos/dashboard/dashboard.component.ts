import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VehiculoFormComponent } from './vehiculo-form/vehiculo-form.component';
import { VehiculoVerComponent } from './vehiculo-ver/vehiculo-ver.component';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { Flota } from 'src/app/models/flota.model';

import { FlotaService } from 'src/app/services/flota.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { style: 'width: 100%' },
})
export class DashboardComponent {
  vehiculos!: Vehiculo[];
  filtro!: string;
  flotasList!: Flota[];
  mensaje!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private service: VehiculoService,
    private Flotaservice: FlotaService
  ) {
    this.Flotaservice.GetFlotas().subscribe((res: any) => {
      this.flotasList = res.data;
    });

    this.loadVehiculos();
  }

  loadVehiculos() {
    this.service.GetVehiculos().subscribe((res: any) => {
      this.vehiculos = res.data;
      if(!this.vehiculos || this.vehiculos.length === 0){
        this.mensaje = "No se encuentran vehiculos disponibles."
      }
    });  
  }

  openpopup() {}

  Add() {
    var _dialog = this.dialog.open(VehiculoFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Vehiculo',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadVehiculos();
      }
    });
  }

  Show(id: any) {
    var _dialog = this.dialog.open(VehiculoVerComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        id: id,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadVehiculos();
      }
    });
  }

  registroKilometraje(vehiculo: Vehiculo) {
    this.router.navigate(['/registroKilometraje'], {
      queryParams: { id: vehiculo.id, license_plate: vehiculo.license_plate },
    });
  }

  registroCombustible(vehiculo: Vehiculo) {
    this.router.navigate(['/registroCombustible'], {
      queryParams: {
        id: vehiculo.id,
        license_plate: vehiculo.license_plate,
        brand_name: vehiculo.brand_name,
        model_name: vehiculo.model_name,
      },
    });
  }

  monitoreoCombustible(vehiculo: Vehiculo) {
    this.router.navigate(['/monitoreoCombustible'], {
      queryParams: {
        id: vehiculo.id,
        license_plate: vehiculo.license_plate,
        brand_name: vehiculo.brand_name,
        model_name: vehiculo.model_name,
      },
    });
  }

  historicoDanos(vehiculo: Vehiculo) {
    this.router.navigate(['/historicoDaños'], {
      queryParams: { id: vehiculo.id,
        license_plate: vehiculo.license_plate,
        brand_name: vehiculo.brand_name,
        model_name: vehiculo.model_name,
       },
    });
  }

  mantenimientosVehiculos(vehiculo: Vehiculo) {
    this.router.navigate(['/mantenimientosVehiculo'], {
      queryParams: { id: vehiculo.id,
        license_plate: vehiculo.license_plate,
        brand_name: vehiculo.brand_name,
        model_name: vehiculo.model_name,
       },
    });
  }
}
