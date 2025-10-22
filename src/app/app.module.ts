import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { AdministrarUsuariosComponent } from './components/modulo-seguridad/administrar-usuarios/administrar-usuarios.component';
import { GestionarTiposUsuariosComponent } from './components/modulo-seguridad/gestionar-tipos-usuarios/gestionar-tipos-usuarios.component';
import { GestionarFlotasComponent } from './components/modulo-vehiculos/gestionar-flotas/gestionar-flotas.component';
import { GestionarTiposVehiculosComponent } from './components/modulo-vehiculos/gestionar-tipos-vehiculos/gestionar-tipos-vehiculos.component';
import { PerfilesPermisosComponent } from './components/modulo-seguridad/perfiles-permisos/perfiles-permisos.component';
import { GestionarPlanesMantenimientoComponent } from './components/modulo-gestion-mantenimiento/gestionar-planes-mantenimiento/gestionar-planes-mantenimiento.component';
import { GestionarRegistrosDocumentacionComponent } from './components/modulo-documentacion/gestionar-registros-documentacion/gestionar-registros-documentacion.component';
import { GenerarReportesComponent } from './components/modulo-reportes/generar-reportes/generar-reportes.component';
import { CopiasSeguridadComponent } from './components/modulo-seguridad/copias-seguridad/copias-seguridad.component';
import { ConfiguracionesComponent } from './components/modulo-administracion/configuraciones/configuraciones.component';
import { GestionarDebatesComponent } from './components/modulo-mensajeria/gestionar-debates/gestionar-debates.component';
import { DashboardComponent } from './components/modulo-vehiculos/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VizualizarGuiaUsuarioComponent } from './components/vizualizar-guia-usuario/vizualizar-guia-usuario.component';
import { TiposCombustibleComponent } from './components/modulo-vehiculos/tipos-combustible/tipos-combustible.component';
import { LoginComponent } from './components/modulo-seguridad/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MarcaComponent } from './components/modulo-vehiculos/marca-modelo/marca.component';
import { ModeloComponent } from './components/modulo-vehiculos/marca-modelo/modelo.component';
import { DepositosComponent } from './components/modulo-administracion/depositos/depositos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FechaLocalPipe } from './pipes/fecha-local.pipe';
import { MarcaFormComponent } from './components/modulo-vehiculos/marca-modelo/marca-form/marca-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlotaFormComponent } from './components/modulo-vehiculos/gestionar-flotas/flota-form/flota-form.component';
import { TipoVehiculoFormComponent } from './components/modulo-vehiculos/gestionar-tipos-vehiculos/tipoVehiculo-form/tipoVehiculo-form.component';
import { TipoCombustibleFormComponent } from './components/modulo-vehiculos/tipos-combustible/tipoCombustible-form/tipoCombustible-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TipoVehiculoModFormComponent } from './components/modulo-vehiculos/gestionar-tipos-vehiculos/tipoVehiculo-modform/tipoVehiculo-modform.component';
import { TipoCombustibleModFormComponent } from './components/modulo-vehiculos/tipos-combustible/tipoCombustible-modform/tipoCombustible-modform.component';
import { FlotaModFormComponent } from './components/modulo-vehiculos/gestionar-flotas/flota-modform/flota-modform.component';
import { TipoUsuarioModFormComponent } from './components/modulo-seguridad/gestionar-tipos-usuarios/tipoUsuario-modform/tipoUsuario-modform.component';
import { TipoUsuarioFormComponent } from './components/modulo-seguridad/gestionar-tipos-usuarios/tipoUsuario-form/tipoUsuario-form.component';
import { EstacionesModFormComponent } from './components/modulo-administracion/estaciones/estaciones-modform/estaciones-modform.component';
import { EstacionesFormComponent } from './components/modulo-administracion/estaciones/estaciones-form/estaciones-form.component';
import { EstacionesComponent } from './components/modulo-administracion/estaciones/estaciones.component';
import { MatMenuModule } from '@angular/material/menu';
import { RegistroCombustibleComponent } from './components/modulo-vehiculos/registroCombustible/registroCombustible.component';
import { RegistroKilometrajeComponent } from './components/modulo-gestion-mantenimiento/registrokilometraje/registroKilometraje.component';
import { HistoricoDañosComponent } from './components/modulo-gestion-mantenimiento/historicoDaños/historicoDaños.component';
import { MonitoreoCombustibleComponent } from './components/modulo-vehiculos/monitoreoCombustible/monitoreoCombustible.component';
import { MantenimientosVehiculoComponent } from './components/modulo-gestion-mantenimiento/mantenimientosVehiculo/mantenimientosVehiculo.component';
import { MarcaModFormComponent } from './components/modulo-vehiculos/marca-modelo/marca-modform/marca-modform.component';
import { RegistroCombustibleModFormComponent } from './components/modulo-vehiculos/registroCombustible/registroCombustible-modform/registroCombustible-modform.component';
import { RegistroCombustibleFormComponent } from './components/modulo-vehiculos/registroCombustible/registroCombustible-form/registroCombustible-form.component';
import { ModeloFormComponent } from './components/modulo-vehiculos/marca-modelo/modelo-form/modelo-form.component';
import { ModeloModFormComponent } from './components/modulo-vehiculos/marca-modelo/modelo-modform/modelo-modform.component';
import { DepositoFormComponent } from './components/modulo-administracion/depositos/depositos-form/depositos-form.component';
import { DepositoModFormComponent } from './components/modulo-administracion/depositos/depositos-modform/depositos-modform.component';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TokenInterceptor } from './services/tokenInterceptor.service';
import { MatRadioModule } from '@angular/material/radio';
import { VehiculoFormComponent } from './components/modulo-vehiculos/dashboard/vehiculo-form/vehiculo-form.component';
import { VehiculoVerComponent } from './components/modulo-vehiculos/dashboard/vehiculo-ver/vehiculo-ver.component';
import { FiltrarVehiculosPipe } from './pipes/filtrar-vehiculos.pipe';
import { NgChartsModule } from 'ng2-charts';
import { FiltrarRegistroCombustiblePipe } from './pipes/filtrar-registro-combustible.pipe';
import { DatePipe } from '@angular/common';
import { UnidadComponent } from './components/modulo-administracion/TipoUnidad - Unidad/unidad.component';
import { TipoUnidadComponent } from './components/modulo-administracion/TipoUnidad - Unidad/tipoUnidad.component';
import { TipoUnidadFormComponent } from './components/modulo-administracion/TipoUnidad - Unidad/tipoUnidad-form/tipoUnidad-form.component';
import { TipoUnidadModFormComponent } from './components/modulo-administracion/TipoUnidad - Unidad/tipoUniadad-modform/tipoUnidad-modform.component';
import { UnidadModFormComponent } from './components/modulo-administracion/TipoUnidad - Unidad/unidad-modform/unidad-modform.component';
import { UnidadFormComponent } from './components/modulo-administracion/TipoUnidad - Unidad/unidad-form/unidad-form.component';
import { AdministrarUsuariosFormComponent } from './components/modulo-seguridad/administrar-usuarios/administrar-usuarios-form/administrar-usuarios-form.component';
import { ActionSectionTypePipe } from './pipes/action-section-type.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    AdministrarUsuariosComponent,
    GestionarTiposUsuariosComponent,
    GestionarFlotasComponent,
    GestionarTiposVehiculosComponent,
    PerfilesPermisosComponent,
    GestionarPlanesMantenimientoComponent,
    GestionarRegistrosDocumentacionComponent,
    GenerarReportesComponent,
    CopiasSeguridadComponent,
    ConfiguracionesComponent,
    GestionarDebatesComponent,
    DashboardComponent,
    VizualizarGuiaUsuarioComponent,
    TiposCombustibleComponent,
    LoginComponent,
    DepositosComponent,
    FechaLocalPipe,
    MarcaFormComponent,
    ModeloComponent,
    MarcaComponent,
    FlotaFormComponent,
    TipoVehiculoFormComponent,
    TipoCombustibleFormComponent,
    TipoVehiculoModFormComponent,
    TipoCombustibleModFormComponent,
    FlotaModFormComponent,
    TipoUsuarioModFormComponent,
    TipoUsuarioFormComponent,
    EstacionesModFormComponent,
    EstacionesFormComponent,
    EstacionesComponent,
    RegistroCombustibleComponent,
    MantenimientosVehiculoComponent,
    MonitoreoCombustibleComponent,
    HistoricoDañosComponent,
    RegistroKilometrajeComponent,
    MarcaModFormComponent,
    RegistroCombustibleModFormComponent,
    RegistroCombustibleFormComponent,
    ModeloFormComponent,
    ModeloModFormComponent,
    DepositoFormComponent,
    DepositoModFormComponent,
    VehiculoVerComponent,
    VehiculoFormComponent,
    FiltrarVehiculosPipe,
    FiltrarRegistroCombustiblePipe,
    UnidadComponent,
    TipoUnidadComponent,
    TipoUnidadFormComponent,
    TipoUnidadModFormComponent,
    UnidadModFormComponent,
    UnidadFormComponent,
    AdministrarUsuariosFormComponent,
    ActionSectionTypePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    NgFor,
    HttpClientModule,
    MatRadioModule,
    NgChartsModule,
    MatCheckboxModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
