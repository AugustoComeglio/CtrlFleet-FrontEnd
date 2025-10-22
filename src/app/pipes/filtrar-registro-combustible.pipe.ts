import { Pipe, PipeTransform } from '@angular/core';
import { RegistroCombustible } from '../models/registroCombustible.model';

@Pipe({
  name: 'filtrarRegistroCombustible'
})
export class FiltrarRegistroCombustiblePipe implements PipeTransform {

  transform(registros: RegistroCombustible[], filtro: string) {
    if (registros?.length > 0 && filtro ) {
      const filtrado = filtro.toLowerCase();
      const registrosFiltrados = registros.filter(registro => registro.vehicle_hash.license_plate.toLowerCase().indexOf(filtrado) !== -1);
      return registrosFiltrados;
    }
    return registros;
  }

}
