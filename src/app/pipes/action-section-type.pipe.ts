import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionSectionType',
})
export class ActionSectionTypePipe implements PipeTransform {
  transform(value: string): string {
    // Reemplazar "UserType" por "Tipo Usuario"
    value = value.replace(/UserTypePermission/g, 'Tipo usuario permisos');

    // Reemplazar "UserType" por "Tipo Usuario"
    value = value.replace(/UserType/g, 'Tipo usuario');

    // Reemplazar "User" por "Administrar Usuarios"
    value = value.replace(/User/g, 'Administrar usuarios');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Fleet/g, 'Flotas');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/VehicleType/g, 'Tipos de vehiculo');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Vehicle/g, 'Dashboard / vehiculos');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/FuelType/g, 'Tipos de combustible');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/FuelRecord/g, 'Registro de combustible');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Brand/g, 'Marca');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Model/g, 'Modelo');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/MantenancePlan/g, 'Plan de mantenimiento');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/MantenanceType/g, 'Tipo de mantenimiento');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Mantenance/g, 'Mantenimiento');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Document/g, 'Documentacion');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/ReportController/g, 'Reportes');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Warehouse/g, 'Deposito');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Debate/g, 'Debates');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Failure/g, 'Registrar fallas');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/GasStation/g, 'Estaciones');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Image/g, 'Imagenes');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/KilometerRecord/g, 'Registrar kilometros');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/NotificationType/g, 'Tipo de notificaciones');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Permission/g, 'Gestionar permisos');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Response/g, 'Respuestas');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/UnitType/g, 'Tipo de unidad');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/Unit/g, 'Unidad');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/manage/g, 'Todos los permisos');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/index/g, 'Ver todos');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/show/g, 'Ver uno');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/create/g, 'Crear');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/update/g, 'Modificar');

    // Reemplazar "Fleet" por "Flotas"
    value = value.replace(/destroy/g, 'Eliminar');

    return value;
  }
}
