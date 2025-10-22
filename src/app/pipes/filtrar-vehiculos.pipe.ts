import { Pipe, PipeTransform } from '@angular/core';
import { Vehiculo } from '../models/vehiculo.model';

@Pipe({
  name: 'filtrarVehiculos',
})
export class FiltrarVehiculosPipe implements PipeTransform {
  transform(vehiculos: Vehiculo[], filtro: string) {
    if (vehiculos?.length > 0 && filtro) {
      const filtrado = filtro.toLowerCase();
      const vehiculosFiltrados = vehiculos.filter(
        (vehiculo) =>
          vehiculo.license_plate.toLowerCase().indexOf(filtrado) !== -1 ||
          vehiculo.brand_name.toLowerCase().indexOf(filtrado) !== -1 ||
          vehiculo.model_name.toLowerCase().indexOf(filtrado) !== -1
      );
      return vehiculosFiltrados;
    }
    return vehiculos;
  }
}
