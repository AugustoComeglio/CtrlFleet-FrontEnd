import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepositoService } from 'src/app/services/deposito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depositos-form',
  templateUrl: './depositos-form.component.html',
  styleUrls: ['./depositos-form.component.scss'],
})
export class DepositoFormComponent implements OnInit {

  inputData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DepositoFormComponent>,
    private buildr: FormBuilder,
    private service: DepositoService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.buildr.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]+$')]],
    code: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
    location: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9\\s-]+$")]],
  });

  saveDeposito() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      warehouse: {
        name: dataToSave.name,
        code: dataToSave.name,
        location: dataToSave.location,
      },
    };

    this.service.SaveDeposito(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Deposito creado con exito!',
          'Se creo la Deposito con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creación de la Deposito!',
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
