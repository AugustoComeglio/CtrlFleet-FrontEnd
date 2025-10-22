import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModeloService } from 'src/app/services/modeloVehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modelo-modform',
  templateUrl: './modelo-modform.component.html',
  styleUrls: ['./modelo-modform.component.scss'],
})
export class ModeloModFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModeloModFormComponent>,
    private builder: FormBuilder,
    private service: ModeloService
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
      model: {
        name: dataToSave.name,
        brand_id: this.inputData.brand_id
      },
    };

    this.service.UpdateModelo(this.inputData.id,datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Modelo modificada con exito!',
          'Se modifico el Modelo con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación de la Modelo!',
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
