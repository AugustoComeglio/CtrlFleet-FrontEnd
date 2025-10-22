import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoUnidadService } from 'src/app/services/tipoUnididad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoUnidad-form',
  templateUrl: './tipoUnidad-form.component.html',
  styleUrls: ['./tipoUnidad-form.component.scss'],
})
export class TipoUnidadFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TipoUnidadFormComponent>,
    private builder: FormBuilder,
    private service: TipoUnidadService
  ) {}

  inputData: any;
  editData: any;

  ngOnInit(): void {
    this.inputData = this.data;
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.builder.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  saveDataToService() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      unit_type: {
        name: dataToSave.name,
      },
    };

    this.service.SaveTipoUnidad(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Tipo Unidad creada con exito!',
          'Se creo la Tipo Unidad con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creacion de la Tipo Unidad!',
          'No se ha podido realizar el proceso de creacion de: ' +
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
