import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Chart } from 'chart.js';
import { RegistroCombustibleService } from 'src/app/services/registroCombustible.service';
import { RegistroCombustible } from 'src/app/models/registroCombustible.model';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-monitoreoCombustible',
  templateUrl: './monitoreoCombustible.component.html',
  styleUrls: ['./monitoreoCombustible.component.scss']
})
export class MonitoreoCombustibleComponent implements OnInit {
 
  title: any
  vehicle_id: any
  chartBarra: any;
  chartPie: any;
  chartLine: any;
  combPorMes: string[] = [];
  meses: string[] = [];
  estaciones: string[] = [];
  combPorEstacion:number[] = [];
  precioPorMes!:number[]
  dataMonitoreo!: any
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service:  VehiculoService
   
  ) {
    this.route.queryParams.subscribe((params:any) =>{
      this.title = 'Monitoreo Combustible / ' + params.brand_name + ' / ' + params.model_name + ' / ' + params.license_plate;
      this.vehicle_id = params.id;
    });

    

    
  }

  ngOnInit(): void {



    //meses
    this.meses = ['Enero', 'Febrero', 'Marzo','Abril','Mayo', 'Junio', 'Julio','Agosto', 'Septiembre','Octubre','Noviembre','Diciembre']

    //get de cantidad de combustibble por mes de un vehiculo
    this.combPorMes = ['200','350', '200', '100', '50','200', '100', '350', '450', '500', '700', '250'];

    //get de cantidad de combustibble por mes de un vehiculo
    this.precioPorMes = [200,350, 200, 100, 50,200, 100, 350, 450, 500, 700, 250];

    //get de cantidad de combustibble por estacion
    this.combPorEstacion = [900, 1100, 1450];

    //get estaciones
    this.estaciones = ['YPF','Axion','Shell'];
    
    this.graficoBarra();
    
    this.graficoDona();
  
    this.graficoLine();
  }

 



  graficoBarra(){
    this.chartLine = new Chart("MyChartBar", {
      type: 'bar', 

      data: {
        labels: this.meses, 
	       datasets: [
          {
            label: "Litros",
            data: this.combPorMes,
            backgroundColor: 'lightblue'
          }, 
        ]
      },
      options: {
        aspectRatio:4.5
      }
    });
  }

  graficoDona(){
    this.chartPie = new Chart("MyChartPie", {
      type: 'doughnut', 
      data: {
        labels: this.estaciones,
        datasets: [{
          label: 'Estaciones',
          data: this.combPorEstacion,
          backgroundColor: [
            'lightcoral',
            'lightblue',
            '#b0f2c2'
          ],
          hoverOffset: 4
        }]
      },
    });
  }

  graficoLine(){
    this.chartLine = new Chart("MyChartLine", {
      type: 'line', 
      data : {
        labels: this.meses,
        datasets: [{
          label: 'Historico Combustible',
          data: this.precioPorMes,
          fill: false,
          borderColor: 'lightblue',
          tension: 0.1
        }]
      },
    });
  }




}





  