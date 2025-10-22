import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstacionService } from 'src/app/services/estacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estaciones-form',
  templateUrl: './estaciones-form.component.html',
  styleUrls: ['./estaciones-form.component.scss'],
})
export class EstacionesFormComponent implements OnInit {

  inputData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EstacionesFormComponent>,
    private buildr: FormBuilder,
    private service: EstacionService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.buildr.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  saveEstacion() {
    // this.service.SaveEstacion(this.myForm.value).subscribe((res) => {
    //   this.closeDialog();
    // });

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      gas_station: {
        name: dataToSave.name,
      },
    };

    this.service.SaveEstacion(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Estación creada con exito!',
          'Se creo la Estación con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creación de la Estación!',
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
