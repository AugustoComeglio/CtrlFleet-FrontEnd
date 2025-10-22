import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandService } from 'src/app/services/marcaVehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca-modform',
  templateUrl: './marca-modform.component.html',
  styleUrls: ['./marca-modform.component.scss'],
})
export class MarcaModFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MarcaModFormComponent>,
    private builder: FormBuilder,
    private service: BrandService
  ) {}

  inputData: any;
  editData: any;

  ngOnInit(): void {
    this.inputData = this.data;
    this.myForm.controls['name'].setValue(this.inputData.name);
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.builder.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  updateBrand() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      brand: {
        name: dataToSave.name,
      },
    };

    this.service.UpdateBrand(this.inputData.id,datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Marca modificada con exito!',
          'Se modifico la marca con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación de la Marca!',
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
