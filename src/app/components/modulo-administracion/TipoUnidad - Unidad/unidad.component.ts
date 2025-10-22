import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Unidad } from 'src/app/models/unidad.model';
import { UnidadModFormComponent } from './unidad-modform/unidad-modform.component';
import { MatDialog,MatDialogRef, MatDialogModule,} from '@angular/material/dialog';
import { UnidadFormComponent } from './unidad-form/unidad-form.component';
import { UnidadService } from 'src/app/services/unidad.service';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss'],
})
export class UnidadComponent {

  unidadeslist!: Unidad[];
  displayedColumns: string[] = ['name', 'acciones'];
  dataSource: any;
  value = 'Buscar';
  unit_type_id: any;
  title: any;


  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog, 
    private service: UnidadService,
    private route: ActivatedRoute,
    private router: Router,
    
    ) {
      this.route.queryParams.subscribe((params:any) =>{
        this.title = 'Unidades / ' + params.tipoUnidad;
        this.unit_type_id = params.unit_type_id;
      });
      this.loadUnits();
    }


  
  ngOnInit(): void {
   this.route.queryParams.subscribe((params:any) =>{
    if(!params.tipoUnidad || params.tipoUnidad === "") {
      this.router.navigateByUrl('/tipoUnidad');
    }
   })
  }

  ngAfterViewInit() {}

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  loadUnits() {
    
    this.service.GetUnidadByTipoUnidad(this.unit_type_id).subscribe((res: any) => {
      this.unidadeslist = res.data;
      this.dataSource = new MatTableDataSource<Unidad>(
        this.unidadeslist
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Add() {
    var _dialog = this.dialog.open(UnidadFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Unidad',
        unit_type_id: this.unit_type_id,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadUnits();
      }
    });
  }


  Mod(id: any, name: string){
    var _dialog = this.dialog.open(UnidadModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Unidad: ' + name,
        id: id,
        name: name,
        unit_type_id: this.unit_type_id,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadUnits();
      }
    });

  }

  Delete(id: any, name: string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteUnidad(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino la Unidad: ' + name,
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación de la Unidad!',
              'No se ha podido realizar el proceso de eliminación de: ' +
                name,
              'error'
            )
          }
        );
        this.loadUnits();
      }
    })
  }


}
