import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadService } from 'src/app/services/unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidad-modform',
  templateUrl: './unidad-modform.component.html',
  styleUrls: ['./unidad-modform.component.scss'],
})
export class UnidadModFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UnidadModFormComponent>,
    private builder: FormBuilder,
    private service: UnidadService
  ) {}

  inputData: any;
  editData: any;

  ngOnInit(): void {
    this.inputData = this.data;
    this.myForm.controls["name"].setValue(this.inputData.name);
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.builder.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  updateTipoUnidad() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

  
    const dataToSave = this.myForm.value;
    const datajson = {
      unit: {
        name: dataToSave.name,
        unit_type_id: this.inputData.unit_type_id
      },
    };

    this.service.UpdateUnidad(this.inputData.id,datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Unidad modificada con exito!',
          'Se modifico el Unidad con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación de la Unidad!',
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
