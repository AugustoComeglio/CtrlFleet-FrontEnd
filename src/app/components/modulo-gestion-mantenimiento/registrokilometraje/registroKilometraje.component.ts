import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registroKilometraje',
  templateUrl: './registroKilometraje.component.html',
  styleUrls: ['./registroKilometraje.component.scss']
})
export class RegistroKilometrajeComponent {
  title: any
  vehicle_id: any
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
   
  ) {
    this.route.queryParams.subscribe((params:any) =>{
      this.title = 'Registro Kilometraje / ' + params.brand_name + ' / ' + params.model_name + ' / ' + params.license_plate;
      this.vehicle_id = params.id;
    });
  }

  

}
