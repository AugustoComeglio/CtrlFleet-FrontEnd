import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoUnidadService } from 'src/app/services/tipoUnididad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoUnidad-modform',
  templateUrl: './tipoUnidad-modform.component.html',
  styleUrls: ['./tipoUnidad-modform.component.scss'],
})
export class TipoUnidadModFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TipoUnidadModFormComponent>,
    private builder: FormBuilder,
    private service: TipoUnidadService
  ) {}

  inputData: any;
  editData: any;

  ngOnInit(): void {
    this.inputData = this.data;
    this.myForm.controls['name'].setValue(this.inputData.name);
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.builder.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  updateBrand() {
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

    this.service.UpdateTipoUnidad(this.inputData.id,datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Tipo Unidad modificada con exito!',
          'Se modifico el Tipo Unidad con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación de la Tipo Unidad!',
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
