import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TipoCombustibleService } from 'src/app/services/tipoCombustible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoCombustible-modform',
  templateUrl: './tipoCombustible-modform.component.html',
  styleUrls: ['./tipoCombustible-modform.component.scss'],
})
export class TipoCombustibleModFormComponent implements OnInit {
  inputData: any;
  editData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TipoCombustibleModFormComponent>,
    private buildr: FormBuilder,
    private service: TipoCombustibleService
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

  updateTipoCombustible() {
  

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    
    const dataToSave = this.myForm.value;
    const datajson = {
      fuel_type: {
        name: dataToSave.name,
      },
    };

    this.service.UpdateTipoCombustible(this.inputData.id, datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Tipo Combustible modificado con exito!',
          'Se modifico el Tipo Combustible con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación del Tipo Combustible!',
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
