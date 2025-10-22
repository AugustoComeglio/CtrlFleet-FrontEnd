import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { modeloVehiculo } from 'src/app/models/modeloVehiculo.model';
import { ModeloModFormComponent } from './modelo-modform/modelo-modform.component';
import { MatDialog,MatDialogRef, MatDialogModule,} from '@angular/material/dialog';
import { ModeloFormComponent } from './modelo-form/modelo-form.component';
import { ModeloService } from 'src/app/services/modeloVehiculo.service';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

/*
//https://www.youtube.com/watch?v=jT5D8Ks5N8w&list=PLfyWdpsiUiPCCf0CBsjpDN-Qxg64qsx8n&index=8
*/
@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss'],
})
export class ModeloComponent {

  modeloslist!: modeloVehiculo[];
  displayedColumns: string[] = ['name', 'acciones'];
  dataSource: any;
  value = 'Buscar';
  marca_id: any;
  title: any; 


  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog, 
    private service: ModeloService,
    private route: ActivatedRoute,
    private router: Router,
    
    
    ) {
      this.route.queryParams.subscribe((params:any) =>{
        this.title = 'Modelos / ' + params.marca;
        this.marca_id = params.marca_id;
      });
      this.loadmodels();
    }


  
  ngOnInit(): void {
   this.route.queryParams.subscribe((params:any) =>{
    if(!params.marca || params.marca === "") {
      this.router.navigateByUrl('/marca');
    }
   })
  }

  
  


  ngAfterViewInit() {}

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  loadmodels() {
    
    this.service.GetModelobyMarca(this.marca_id).subscribe((res: any) => {
      this.modeloslist = res.data;
      this.dataSource = new MatTableDataSource<modeloVehiculo>(
        this.modeloslist
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Add() {
    var _dialog = this.dialog.open(ModeloFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Modelo',
        brand_id : this.marca_id,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadmodels();
      }
    });
  }


  Mod(id: any, name: any){
    var _dialog = this.dialog.open(ModeloModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Modelo: ' + name,
        id: id,
        name: name,
        brand_id : this.marca_id,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadmodels();
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
        this.service.DeleteModelo(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino la Modelo: ' + name,
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación del Modelo!',
              'No se ha podido realizar el proceso de eliminación de: ' +
                name,
              'error'
            )
          }
        );
        this.loadmodels();
      }
    })
  }


}
