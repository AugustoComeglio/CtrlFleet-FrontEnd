import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModeloService } from 'src/app/services/modeloVehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modelo-form',
  templateUrl: './modelo-form.component.html',
  styleUrls: ['./modelo-form.component.scss'],
})
export class ModeloFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModeloFormComponent>,
    private builder: FormBuilder,
    private service: ModeloService
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
      model: {
        name: dataToSave.name,
        brand_id: this.inputData.brand_id
      },
    };

    this.service.SaveModelo(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Modelo creado con exito!',
          'Se creo el Modelo con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creacion del Modelo!',
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
