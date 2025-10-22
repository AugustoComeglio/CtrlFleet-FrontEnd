import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlotaService } from 'src/app/services/flota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flota-form',
  templateUrl: './flota-form.component.html',
  styleUrls: ['./flota-form.component.scss'],
})
export class FlotaFormComponent implements OnInit {

  inputData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FlotaFormComponent>,
    private buildr: FormBuilder,
    private service: FlotaService
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
    code: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  saveFlota() {
    // this.service.SaveFlota(this.myForm.value).subscribe((res) => {
    //   this.closeDialog();
    // });

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

    this.service.SaveFlota(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Flota creada con exito!',
          'Se creo la Flota con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creación de la Flota!',
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
