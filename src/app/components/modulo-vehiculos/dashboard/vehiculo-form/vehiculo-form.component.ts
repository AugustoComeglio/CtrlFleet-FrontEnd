import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BrandService } from 'src/app/services/marcaVehiculo.service';
import { ModeloService } from 'src/app/services/modeloVehiculo.service';
import { TipoCombustibleService } from 'src/app/services/tipoCombustible.service';
import { TipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { marcaVehiculo } from 'src/app/models/marcaVehiculo.models';
import { modeloVehiculo } from 'src/app/models/modeloVehiculo.model';
import { TipoCombustible } from 'src/app/models/tipoCombustible.model';
import { TipoVehiculo } from 'src/app/models/tipoVehiculo.model';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Flota } from 'src/app/models/flota.model';
import { FlotaService } from 'src/app/services/flota.service';
import { Deposito } from 'src/app/models/deposito.model';
import { DepositoService } from 'src/app/services/deposito.service';
import { Usuario } from 'src/app/models/user.model';
import { TipoUsuarioService } from 'src/app/services/tipoUsuario.service';
import { TipoUsuario } from 'src/app/models/tipoUsuario.model';


@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.scss'],
})

export class VehiculoFormComponent implements OnInit {

  inputData: any;
  tipoCombustibleList!: TipoCombustible[];
  modeloList!: modeloVehiculo[];
  marcaList!: marcaVehiculo[];
  tipoVehiculoList!: TipoVehiculo[];
  flotasList!: Flota[];
  depositosList!:Deposito[];
  ususariosList!:Usuario[];
  tiposUsuariosList!: TipoUsuario[];

  


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VehiculoFormComponent>,
    private builder: FormBuilder,
    private service: VehiculoService,
    private Marcaservice: BrandService,
    private Modeloservice: ModeloService,
    private tipoCombustibleservice: TipoCombustibleService,
    private tipoVehiculoservice: TipoVehiculoService,
    private Flotaservice: FlotaService,
    private Depositoservice: DepositoService,
    private TipoUsuariosservice: TipoUsuarioService,

  ) {

    this.tipoCombustibleservice.GetTipoCombustible().subscribe((res:any) => {
      this.tipoCombustibleList = res.data;
    });

    this.tipoVehiculoservice.GetTipoVehiculo().subscribe((res:any) => {
      this.tipoVehiculoList = res.data;
    });

    this.Marcaservice.GetBrand().subscribe((res:any) => {
      this.marcaList = res.data;
      
    });

    this.myForm.get('brand_id')?.valueChanges.subscribe(id => {
      this.Modeloservice.GetModelobyMarca(id).subscribe((res:any) => {
        this.modeloList = res.data;
      });
    });

    //harcodeadoo
    this.TipoUsuariosservice.GetTipoUsuario().subscribe((resp:any) => {
      this.tiposUsuariosList=resp.data;
      const tipoUsuario = this.tiposUsuariosList.find(tipo => tipo.name === "conductor");
      this.TipoUsuariosservice.GetUsuarioByTipoUsuario(tipoUsuario?.id).subscribe((res:any) => {
        this.ususariosList = res.data;
      });
    });

  

    // this.TipoUsuariosservice.GetUsuarioByTipoUsuario(3).subscribe((res:any) => {
    //   this.ususariosList = res.data;
    // });

    this.Flotaservice.GetFlotas().subscribe((res:any) => {
      this.flotasList = res.data;
    });

    this.Depositoservice.GetDepositos().subscribe((res:any) => {
      this.depositosList = res.data;
    });

  }
  

  ngOnInit(): void {
    this.inputData = this.data;
  }

  setDialogData(code: any) {}

  closeDialog() {
    this.dialogRef.close('Close usando funcion');
  }

  
  myForm = this.builder.group({
    license_plate: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
    initial_kms: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    production_year: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    color: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
    vehicle_type_id: ['', Validators.required],
    fuel_type_id: ['', Validators.required],
    warehouse_id: ['', Validators.required],
    brand_id: ['', Validators.required],
    model_id: ['', Validators.required],
    tank_capacity: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    driver_id: ['', Validators.required],
    fleet_id: ['', Validators.required],
  });

  saveVehiculo() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const dataToSave = this.myForm.value;
    const datajson = {
      vehicle:{
        license_plate: dataToSave.license_plate,
        initial_kms: dataToSave.initial_kms,
        production_year: dataToSave.production_year,
        color: dataToSave.color,
        vehicle_type_id: dataToSave.vehicle_type_id,
        fuel_type_id: dataToSave.fuel_type_id,
        warehouse_id: dataToSave.warehouse_id,
        brand_id: dataToSave.brand_id,
        model_id: dataToSave.model_id,
        tank_capacity: dataToSave.tank_capacity,
        driver_id: dataToSave.driver_id,
        fleet_id: dataToSave.fleet_id,
        }
    };

    this.service.SaveVehiculo(datajson).subscribe(
      (response) => {
        Swal.fire(
          '¡Vehiculo creado con exito!',
          'Se creo el Vehiculo' + datajson.vehicle.license_plate,
          'success'
        );
      },
      (error) => {
        console.error('Error en la solicitud', error);
        Swal.fire(
          '¡Falló la creación del Vehiculo!',
          'No se ha podido realizar el proceso de creación del vehículo: ' + datajson.vehicle.license_plate,
          'error'
        );
      },
      () => {
        this.closeDialog();
      }
    );

  }
}
