import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoUsuarioService } from 'src/app/services/tipoUsuario.service';
import { MatRadioModule } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { permisosModulos } from 'src/app/data/permisosModulos.data';
import { PermisosService } from 'src/app/services/permisos.service';
import { permisos } from 'src/app/models/permisos.model';
import { tap } from 'rxjs/operators';
import { ActionSectionTypePipe } from 'src/app/pipes/action-section-type.pipe';

@Component({
  selector: 'app-tipoUsuario-modform',
  templateUrl: './tipoUsuario-modform.component.html',
  styleUrls: ['./tipoUsuario-modform.component.scss'],
})
export class TipoUsuarioModFormComponent implements OnInit {
  inputData: any;
  permisosList = [];
  transformedData: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TipoUsuarioModFormComponent>,
    private buildr: FormBuilder,
    private service: TipoUsuarioService,
    private servicePermisos: PermisosService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.cargarPermisos();
    /*  this.permisosList.forEach((permiso: permisos) =>
      //this.agregarPermiso(permiso.id)
      console.log(permiso)
    ); */
    this.myForm.controls['name'].setValue(this.inputData.name);
  }

  //variables
  groupedData: { [key: string]: any[] } = {};

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Close usando funcion');
    //console.log(this.myForm);
    //console.log('getPermisos()', this.getPermisos());
    //console.log('this.obtenerIdsConTrue();', this.obtenerIdsConTrue());
  }

  myForm = this.buildr.group({
    name: ['', Validators.required],
    permisos: this.buildr.array([]),
  });

  agregarPermiso(idPermiso: string, actionPermiso: string) {
    return this.buildr.group({
      id: [idPermiso],
      action: [actionPermiso],
      value: [undefined, Validators.required],
    });
  }

  /*  agregarSeccion(actions: any[]) {
    const seccionForm = this.buildr.group({
      actions: this.buildr.array([]),
    });
    const actionsForm = seccionForm.get('actions') as FormArray;
    actions.forEach((action) => {
      actionsForm.push(this.agregarPermiso(action.id));
    });
    const permisos = this.myForm.get('permisos') as FormArray;
    permisos.push(seccionForm);
  } */

  agregarSeccion(actions: any[], section: string) {
    const actionsFormArray = actions.map((action) =>
      this.agregarPermiso(action.id, action.action)
    );
    const seccionForm = this.buildr.group({
      actions: this.buildr.array(actionsFormArray),
      section: [section],
    });
    const permisos = this.myForm.get('permisos') as FormArray;
    permisos.push(seccionForm);
  }

  getPermisos() {
    return this.myForm.get('permisos') as FormArray;
  }

  /*  getActions(j: number) {
    return this.getPermisos().at(j).get('actions') as FormArray;
  } */

  getActions(j: number) {
    const seccionForm = this.getPermisos().at(j) as FormGroup;
    return seccionForm.get('actions') as FormArray;
  }

  transformData(data: any[]): any[] {
    let transformedData: any = [];

    data.forEach((item) => {
      const section = item.section;
      const existingSection = transformedData.find(
        (el: any) => el.section === section
      );

      if (existingSection) {
        existingSection.actions.push({ id: item.id, action: item.action });
      } else {
        transformedData.push({
          section: section,
          actions: [{ id: item.id, action: item.action }],
        });
      }
    });

    return transformedData;
  }

  cargarPermisos() {
    this.servicePermisos
      .GetPermiso()
      .pipe(
        tap((data: any) => {
          // Realiza acciones secundarias aquí, si es necesario
          console.log('Datos de permisos recibidos:', data.data);
          this.permisosList = data.data;
          this.transformedData = this.transformData(this.permisosList);
          console.log('transformedData', this.transformedData);
          this.transformedData.forEach((section: any) => {
            this.agregarSeccion(section.actions, section.section);
          });
        })
      )
      .subscribe((data: any) => {
        console.log('Permisos', this.permisosList);
      });
  }

  // Función para obtener los ID con valor "true".
  obtenerIdsConTrue(): number[] {
    const permisos = this.getPermisos().value;
    const idsConTrue: number[] = [];

    if (permisos && Array.isArray(permisos)) {
      for (const permiso of permisos) {
        if (permiso.actions && Array.isArray(permiso.actions)) {
          for (const action of permiso.actions) {
            if (action.value === true) {
              idsConTrue.push(action.id);
            }
          }
        }
      }
    }
    this.savePermisos(this.inputData.id, idsConTrue);
    return idsConTrue;
  }

  save() {
    this.obtenerIdsConTrue();
    Swal.fire('¡Tipo Usuario modificado con exito!', 'success');
    this.closeDialog();
  }

  savePermisos(id: number, data: number[]) {
    this.service.AddPermisos(id, data);
  }

  UpdateTipoUsuario() {
    // this.service.UpdateTipoUsuario(this.inputData.id ,this.myModForm.value).subscribe((res) => {
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

    this.service.UpdateTipoUsuario(this.inputData.id, datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Tipo Usuario modificado con exito!',
          'Se creo el Tipo Usuario con nombre: ' + dataToSave.name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la modificación de la Tipo Usuario!',
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
