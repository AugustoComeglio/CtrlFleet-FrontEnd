import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TipoVehiculoService } from '../../../../services/tipoVehiculo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tipoVehiculo-form',
  templateUrl: './tipoVehiculo-form.component.html',
  styleUrls: ['./tipoVehiculo-form.component.scss'],
})
export class TipoVehiculoFormComponent implements OnInit {
  inputData: any;
  editData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TipoVehiculoFormComponent>,
    private builder: FormBuilder,
    private service: TipoVehiculoService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Close usando funcion');
  }

  myForm = this.builder.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  saveTipoVehiculo() {
    // console.log('Savetipovehiculo');
    // this.service.SaveTipoVehiculo(this.myForm.value).subscribe((res) => {
    //   this.closeDialog();
    // });

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      vehicle_type: {
        name: dataToSave.name,
      },
    };

    this.service.SaveTipoVehiculo(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Tipo Vehiculo creado con exito!',
          'Se creo el Tipo Vehiculo con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creación del Tipo Vehiculo!',
          'No se ha podido realizar el proceso de creación de: ' +
            dataToSave.name,
          'error'
        );
      },
      () => {
        this.closeDialog();
      }
    );

  }
}
