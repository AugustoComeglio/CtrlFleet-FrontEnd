import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-historicoDaños',
  templateUrl: './historicoDaños.component.html',
  styleUrls: ['./historicoDaños.component.scss']
})
export class HistoricoDañosComponent {
  title: any
  vehicle_id: any

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params:any) =>{
      this.title = 'Historico Daños / '  + params.brand_name + ' / ' + params.model_name + ' / ' + params.license_plate;
      this.vehicle_id = params.id;
    });
  }

  

}
