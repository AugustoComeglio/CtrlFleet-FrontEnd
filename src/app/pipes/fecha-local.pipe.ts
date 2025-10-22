import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaLocal',
})
export class FechaLocalPipe implements PipeTransform {
  transform(fecha: Date): string {
    const opciones = { timeZone: 'America/Argentina/Buenos_Aires' };
    const formato = new Intl.DateTimeFormat('es-AR', opciones);
    return formato.format(fecha);
  }
}
