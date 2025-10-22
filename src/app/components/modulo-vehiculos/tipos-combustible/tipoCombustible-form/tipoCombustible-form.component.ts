import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoCombustibleService } from 'src/app/services/tipoCombustible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoCombustible-form',
  templateUrl: './tipoCombustible-form.component.html',
  styleUrls: ['./tipoCombustible-form.component.scss'],
})
export class TipoCombustibleFormComponent implements OnInit {

  inputData: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TipoCombustibleFormComponent>,
    private buildr: FormBuilder,
    private service: TipoCombustibleService
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

  saveTipoCombustible() {
   
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

    this.service.SaveTipoCombustible(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Tipo Combustible creado con exito!',
          'Se creo el Tipo Combustible con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creacion del Tipo Combustible!',
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

