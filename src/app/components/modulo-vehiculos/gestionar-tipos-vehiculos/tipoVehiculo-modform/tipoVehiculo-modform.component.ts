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
  selector: 'app-tipoVehiculo-modform',
  templateUrl: './tipoVehiculo-modform.component.html',
  styleUrls: ['./tipoVehiculo-modform.component.scss'],
})
export class TipoVehiculoModFormComponent implements OnInit {
  inputData: any;
  editData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TipoVehiculoModFormComponent>,
    private buildr: FormBuilder,
    private service: TipoVehiculoService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.myForm.controls['name'].setValue(this.inputData.name);
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Close usando funcion');
  }

  myForm = this.buildr.group({
    name:  ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  UpdateTipoVehiculo() {
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

    this.service.UpdateTipoVehiculo(this.inputData.id, datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Tipo Vehículo modificado con exito!',
          'Se modifico la Tipo Vehículo con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la actualizacion del Tipo Vehículo!',
          'No se ha podido realizar el proceso de modificación de: ' +
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
