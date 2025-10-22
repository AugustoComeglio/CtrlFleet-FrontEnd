import { Vehiculo } from "./vehiculo.model";

export class RegistroCombustible {
  registered_at: string;
  quantity: string;
  unit_price: string;
  vehicle_id: string;
  gas_station_id:  string;
  unit_id: string;
  observation:string;
  fuel_type_id: string;
  vehicle_hash!: Vehiculo;
  gas_station_name: string;
  unit_type_id: string;

    constructor() {
      this.registered_at = '';  
      this.quantity = '';  
      this.unit_price = ''; 
      this.vehicle_id = ''; 
      this.gas_station_id = '';
      this.fuel_type_id = '';
      this.unit_id = ''; 
      this.observation = '';
      this.gas_station_name = '';
      this.unit_type_id = '';
  }
}

