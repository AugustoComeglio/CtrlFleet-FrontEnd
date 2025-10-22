import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlotaService } from 'src/app/services/flota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flota-modform',
  templateUrl: './flota-modform.component.html',
  styleUrls: ['./flota-modform.component.scss'],
})

export class FlotaModFormComponent implements OnInit {
  inputData: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FlotaModFormComponent>,
    private buildr: FormBuilder,
    private service: FlotaService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.myForm.controls['name'].setValue(this.inputData.name);
    this.myForm.controls['code'].setValue(this.inputData.code);
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.buildr.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
    code: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  updateFlota() {
    
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      fleet: {
        name: dataToSave.name,
        code: dataToSave.code,
      },
    };

    this.service.UpdateFlota(this.inputData.id, datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Flota modificada con exito!',
          'Se modifico la Flota con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación de la Flota!',
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
