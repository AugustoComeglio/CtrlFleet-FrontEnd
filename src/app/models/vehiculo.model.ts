export class Vehiculo {
    id: string;
    license_plate: string;
    initial_kms: string;
    production_year: string;
    color: string;
    vehicle_type_id: string;
    fuel_type_id: string;
    warehouse_id: string;
    brand_id: string;
    model_id: string;
    tank_capacity: string;
    driver_id:string;
    fleet_id: string;
    imagen: string;
    brand_name: string;
    model_name: string;
  
    constructor() {
      this.id = '';
      this.brand_name = '';
      this.model_name = '';
      this.license_plate = '';
      this.initial_kms = '';
      this.production_year = '';
      this.color = '';
      this.vehicle_type_id = '';
      this.fuel_type_id = '';
      this.warehouse_id = '';
      this.brand_id = '';
      this.model_id = '';
      this.tank_capacity= '';
      this.driver_id = '';
      this.fleet_id = '';
      this.imagen = '';
    }
  }