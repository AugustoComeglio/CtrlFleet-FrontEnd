import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstacionService } from 'src/app/services/estacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estaciones-modform',
  templateUrl: './estaciones-modform.component.html',
  styleUrls: ['./estaciones-modform.component.scss'],
})

export class EstacionesModFormComponent implements OnInit {
  inputData: any;

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EstacionesModFormComponent>,
    private buildr: FormBuilder,
    private service: EstacionService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.myForm.controls['name'].setValue(this.inputData.name);
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.buildr.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  updateEstacion() {
   
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

    this.service.UpdateEstacion(this.inputData.id, datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Estacion modificada con exito!',
          'Se modifico la Estación con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación de la Estación!',
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
