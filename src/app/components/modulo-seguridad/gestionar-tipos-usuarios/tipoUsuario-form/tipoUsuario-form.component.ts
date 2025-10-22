import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoUsuarioService } from 'src/app/services/tipoUsuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoUsuario-form',
  templateUrl: './tipoUsuario-form.component.html',
  styleUrls: ['./tipoUsuario-form.component.scss'],
})
export class TipoUsuarioFormComponent implements OnInit {
  inputData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TipoUsuarioFormComponent>,
    private buildr: FormBuilder,
    private service: TipoUsuarioService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Close usando funcion');
  }

  myForm = this.buildr.group({
    name:['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  saveTipoUsuario() {
    // this.service.SaveTipoUsuario(this.myForm.value).subscribe((res) => {
    //   this.closeDialog();
    // });

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      user_type: {
        name: dataToSave.name,
      },
    };

    this.service.SaveTipoUsuario(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Tipo Usuario creado con exito!',
          'Se creo el Tipo Usuario con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creación del Tipo Usuario!',
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
