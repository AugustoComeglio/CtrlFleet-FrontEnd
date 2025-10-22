import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoUsuarioService } from 'src/app/services/tipoUsuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { TipoUsuario } from 'src/app/models/tipoUsuario.model';
import { Usuario } from 'src/app/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-administrar-usuarios-form',
  templateUrl: './administrar-usuarios-form.component.html',
  styleUrls: ['./administrar-usuarios-form.component.scss'],
})
export class AdministrarUsuariosFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdministrarUsuariosFormComponent>,
    private builder: FormBuilder,
    private serviceTipoUsuario: TipoUsuarioService,
    private service: UsuarioService
  ) {}

  usuarios: Usuario[] = [];
  tipoUsuarios: TipoUsuario[] = [];

  dataSource: any = null;
  inputData: any;
  editData: any;

  loadUserTypes() {
    this.serviceTipoUsuario.GetTipoUsuario().subscribe((res: any) => {
      this.tipoUsuarios = res.data;
    });
  }

  loadUsers() {
    this.service.GetUsuario().subscribe((res: any) => {
      this.usuarios = res.data;
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.inputData = this.data;
    this.loadUserTypes();
    this.loadUsers();
  }

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Le paso algo');
  }

  myForm = this.builder.group(
    {
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dni: [null, Validators.required],
      phone: [null, Validators.required],
      email: ['', Validators.required],
      user_type_id: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],
      password2: ['', Validators.required, Validators.minLength(6)],
    },
    {
      validator: this.passwordsMatchValidator, // Agrega la validación personalizada
    }
  );

  // Función de validación personalizada
  passwordsMatchValidator(myForm: any) {
    const password = myForm.get('password').value;
    const password2 = myForm.get('password2').value;

    if (password === password2) {
      return null; // Las contraseñas coinciden, no hay error
    } else {
      myForm.get('password2').setErrors({ mismatch: true });
      return { mismatch: true }; // Las contraseñas no coinciden, establece un error
    }
  }

  saveDataToService() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Obtener los datos de la fuente de datos (marcaData)
    const dataToSave = this.myForm.value;
    const datajson = {
      user: {
        first_name: dataToSave.first_name,
        last_name: dataToSave.last_name,
        dni: dataToSave.dni,
        phone: dataToSave.phone,
        email: dataToSave.email,
        user_type_id: dataToSave.user_type_id,
      },
    };

    this.service.SaveUsuario(datajson).subscribe(
      (response) => {
        Swal.fire(
          'Usuario creada con exito!',
          'Se creo el usuario con nombre: ' + dataToSave.first_name,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creacion del Usuario!',
          'No se ha podido realizar el proceso de creacion de: ' +
            dataToSave.first_name,
          'error'
        );
      },
      () => {
        this.closeDialog();
      }
    );
  }

  cargarPermisos() {}
}
