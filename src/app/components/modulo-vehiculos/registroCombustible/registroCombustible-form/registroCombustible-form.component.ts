import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { RegistroCombustibleService } from '../../../../services/registroCombustible.service';
import { EstacionService } from '../../../../services/estacion.service';
import { TipoCombustibleService } from '../../../../services/tipoCombustible.service';
import Swal from 'sweetalert2';
import { Estacion } from 'src/app/models/estacion.model';
import { TipoCombustible } from 'src/app/models/tipoCombustible.model';
import { TipoUnidadService } from 'src/app/services/tipoUnididad.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Unidad } from 'src/app/models/unidad.model';
import { TipoUnidad } from 'src/app/models/tipoUnidad.model';

@Component({
  selector: 'app-registroCombustible-form',
  templateUrl: './registroCombustible-form.component.html',
  styleUrls: ['./registroCombustible-form.component.scss'],
})
export class RegistroCombustibleFormComponent implements OnInit {
  inputData: any;
  editData: any;
  listEstaciones!: Estacion[];
  listTipocombustibles!: TipoCombustible[];
  listUnidades!: Unidad[];
  listTipoUnidad!: TipoUnidad[];



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistroCombustibleFormComponent>,
    private builder: FormBuilder,
    private service: RegistroCombustibleService,
    private serviceEstacion: EstacionService,
    private serviceTipoCombustible: TipoCombustibleService,
    private serviceUnidad: UnidadService,
    private serviceTipoUnidad: TipoUnidadService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;



    this.serviceTipoUnidad.GetTipoUnidad().subscribe((resp:any) => {
      this.listTipoUnidad=resp.data;
      const tipoUnidad = this.listTipoUnidad.find(tipo => tipo.name === "liquido");
      this.serviceUnidad.GetUnidadByTipoUnidad(tipoUnidad?.id).subscribe((res:any) => {
        this.listUnidades = res.data;
      });
    });


    this.serviceEstacion.GetEstaciones().subscribe((res:any) => {
      this.listEstaciones = res.data;
    });

    this.serviceTipoCombustible.GetTipoCombustible().subscribe((res:any) => {
      this.listTipocombustibles = res.data;
    });
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Close usando funcion');
  }

  // Aquí aplicamos Validators.required
  myForm = this.builder.group({
    registered_at: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    unit_price: ['', [Validators.required, Validators.pattern("^[0-9,.]+$")]],
    fuel_type_id: ['', Validators.required],
    gas_station_id: ['', Validators.required],
    unit_id: ['', Validators.required],
    observation: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")]],
  });

  saveRegistroCombustible() {
    
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    
    const dataToSave = this.myForm.value;
    const datajson = {
      fuel_record: { 
        registered_at: dataToSave.registered_at,
        quantity: dataToSave.quantity,
        unit_price: dataToSave.unit_price?.replace(/,/g, '.'),
        vehicle_id: this.inputData.vehicle_id,
        fuel_type_id: dataToSave.fuel_type_id,
        unit_id: dataToSave.unit_id,
        gas_station_id: dataToSave.gas_station_id,
        observation: dataToSave.observation,
      },
    };
    console.log("datos",datajson);

    this.service.SaveRegistroCombustible(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Registro Combustible creado con exito!',
          'Se creo el Registro Combustible para el vehículo: ' + this.inputData.plate,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creación del Registro Combustible!',
          'No se ha podido realizar el proceso de creación del Registro Combustible par el vehículo: ' + this.inputData.plate,
          'error'
        );
      },
      () => {
        this.closeDialog();
      }
    );

  }
}
