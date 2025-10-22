import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-mantenimientosVehiculo',
  templateUrl: './mantenimientosVehiculo.component.html',
  styleUrls: ['./mantenimientosVehiculo.component.scss']
})
export class MantenimientosVehiculoComponent {
  title: any
  vehicle_id: any

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
   
  ) {
    this.route.queryParams.subscribe((params:any) =>{
      this.title = 'Mantenientos Vehiculo / '  + params.brand_name + ' / ' + params.model_name + ' / ' + params.license_plate;
      this.vehicle_id = params.id;
    });
  }

  

}
