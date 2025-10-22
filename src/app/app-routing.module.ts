import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/modulo-vehiculos/dashboard/dashboard.component';
import { AdministrarUsuariosComponent } from './components/modulo-seguridad/administrar-usuarios/administrar-usuarios.component';
import { PerfilesPermisosComponent } from './components/modulo-seguridad/perfiles-permisos/perfiles-permisos.component';
import { GestionarFlotasComponent } from './components/modulo-vehiculos/gestionar-flotas/gestionar-flotas.component';
import { GestionarPlanesMantenimientoComponent } from './components/modulo-gestion-mantenimiento/gestionar-planes-mantenimiento/gestionar-planes-mantenimiento.component';
import { GestionarRegistrosDocumentacionComponent } from './components/modulo-documentacion/gestionar-registros-documentacion/gestionar-registros-documentacion.component';
import { GenerarReportesComponent } from './components/modulo-reportes/generar-reportes/generar-reportes.component';
import { CopiasSeguridadComponent } from './components/modulo-seguridad/copias-seguridad/copias-seguridad.component';
import { ConfiguracionesComponent } from './components/modulo-administracion/configuraciones/configuraciones.component';
import { GestionarDebatesComponent } from './components/modulo-mensajeria/gestionar-debates/gestionar-debates.component';
import { VizualizarGuiaUsuarioComponent } from './components/vizualizar-guia-usuario/vizualizar-guia-usuario.component';
import { GestionarTiposVehiculosComponent } from './components/modulo-vehiculos/gestionar-tipos-vehiculos/gestionar-tipos-vehiculos.component';
import { TiposCombustibleComponent } from './components/modulo-vehiculos/tipos-combustible/tipos-combustible.component';
import { LoginComponent } from './components/modulo-seguridad/login/login.component';
import { MarcaComponent } from './components/modulo-vehiculos/marca-modelo/marca.component';
import { ModeloComponent } from './components/modulo-vehiculos/marca-modelo/modelo.component';
import { DepositosComponent } from './components/modulo-administracion/depositos/depositos.component';
import { GestionarTiposUsuariosComponent } from './components/modulo-seguridad/gestionar-tipos-usuarios/gestionar-tipos-usuarios.component';
import { EstacionesComponent } from './components/modulo-administracion/estaciones/estaciones.component';
import { MonitoreoCombustibleComponent } from './components/modulo-vehiculos/monitoreoCombustible/monitoreoCombustible.component';
import { RegistroCombustibleComponent } from './components/modulo-vehiculos/registroCombustible/registroCombustible.component';
import { RegistroKilometrajeComponent } from './components/modulo-gestion-mantenimiento/registrokilometraje/registroKilometraje.component';
import { MantenimientosVehiculoComponent } from './components/modulo-gestion-mantenimiento/mantenimientosVehiculo/mantenimientosVehiculo.component';
import { HistoricoDañosComponent } from './components/modulo-gestion-mantenimiento/historicoDaños/historicoDaños.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { vigilanteGuard } from './services/vigilante.guard';
import { UnidadComponent } from './components/modulo-administracion/TipoUnidad - Unidad/unidad.component';
import { TipoUnidadComponent } from './components/modulo-administracion/TipoUnidad - Unidad/tipoUnidad.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: SidenavComponent,
    canActivate: [vigilanteGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [vigilanteGuard],
      },
      { path: 'administrar-usuarios', component: AdministrarUsuariosComponent },
      { path: 'perfiles-permisos', component: PerfilesPermisosComponent },
      { path: 'gestionar-flotas', component: GestionarFlotasComponent },
      {
        path: 'gestionar-tipos-vehiculos',
        component: GestionarTiposVehiculosComponent,
      },
      {
        path: 'gestionar-tipos-combustibles',
        component: TiposCombustibleComponent,
      },
      {
        path: 'gestionar-planes-mantenimiento',
        component: GestionarPlanesMantenimientoComponent,
      },
      {
        path: 'gestionar-registros-documentacion',
        component: GestionarRegistrosDocumentacionComponent,
      },
      { path: 'generar-reportes', component: GenerarReportesComponent },
      { path: 'copias-seguridad', component: CopiasSeguridadComponent },
      { path: 'configuraciones', component: ConfiguracionesComponent },
      {
        path: 'gestionar-debates',
        component: GestionarDebatesComponent,
      },
      {
        path: 'marca-modelo',
        component: MarcaComponent,
      },
      {
        path: 'deposito',
        component: DepositosComponent,
      },
      {
        path: 'visualizar-guia-usuario',
        component: VizualizarGuiaUsuarioComponent,
      },
      {
        path: 'gestionar-tipos-usuarios',
        component: GestionarTiposUsuariosComponent,
      },
      {
        path: 'estaciones',
        component: EstacionesComponent,
      },
      {
        path: 'registroCombustible',
        component: RegistroCombustibleComponent,
      },
      {
        path: 'registroKilometraje',
        component: RegistroKilometrajeComponent,
      },
      {
        path: 'mantenimientosVehiculo',
        component: MantenimientosVehiculoComponent,
      },
      {
        path: 'historicoDaños',
        component: HistoricoDañosComponent,
      },
      {
        path: 'monitoreoCombustible',
        component: MonitoreoCombustibleComponent,
      },
      {
        path: 'modelo',
        component: ModeloComponent,
      },
      {
        path: 'unidad',
        component: UnidadComponent,
      },
      {
        path: 'tipoUnidad',
        component: TipoUnidadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
