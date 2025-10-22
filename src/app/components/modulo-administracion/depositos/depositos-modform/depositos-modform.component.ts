import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepositoService } from 'src/app/services/deposito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depositos-modform',
  templateUrl: './depositos-modform.component.html',
  styleUrls: ['./depositos-modform.component.scss'],
})

export class DepositoModFormComponent implements OnInit {
  inputData: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DepositoModFormComponent>,
    private buildr: FormBuilder,
    private service: DepositoService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    
      this.myForm.controls['name'].setValue(this.inputData.name);
      this.myForm.controls['code'].setValue(this.inputData.code);
      this.myForm.controls['location'].setValue(this.inputData.location);
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.buildr.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
    code: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
    location: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9\\s-]+$")]],
  });

  updateDeposito() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      warehouse: {
        name: dataToSave.name,
        code: dataToSave.code,
        location: dataToSave.location,
      },
    };

    this.service.UpdateDeposito(this.inputData.id, datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Deposito modificado con exito!',
          'Se modifico el Deposito con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación del Deposito!',
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
