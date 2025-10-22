import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DepositoFormComponent } from './depositos-form/depositos-form.component';
import { DepositoModFormComponent } from './depositos-modform/depositos-modform.component';
import { MatDialog } from '@angular/material/dialog';
import { DepositoService } from 'src/app/services/deposito.service';
import { Deposito } from 'src/app/models/deposito.model';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.scss']
})
export class DepositosComponent {

  depositoslist!: Deposito[];
  dataSource: any;
  displayedColumns: string[] = ['nombre', 'codigo', 'ubicacion','acciones'];
  value = 'Buscar';

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog, 
    private service: DepositoService
  ) {
    this.loadDepositos();
  }
  ngAfterViewInit() { }

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Add() {
    var _dialog = this.dialog.open(DepositoFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Crear Deposito',
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadDepositos();
      }
    });
  }
  
  loadDepositos() {
    this.service.GetDepositos().subscribe((res:any) => {
      this.depositoslist = res.data;
      this.dataSource = new MatTableDataSource<Deposito>(this.depositoslist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
        this.service.DeleteDeposito(id).subscribe(
          (response) => {
            Swal.fire(
            'Eliminado!',
            'Se elimino el Deposito: ' + name,
            'success'
            )
          },
          (error) => {
            console.error('Error en la solicitud', error);
            Swal.fire(
              '¡Falló la eliminación del Deposito!',
              'No se ha podido realizar el proceso de eliminación de: ' +
                name,
              'error'
            )
          }
        );
      }
      this.loadDepositos();
    })
  }

  Mod(deposito:Deposito) {
    var _dialog = this.dialog.open(DepositoModFormComponent, {
      width: '40%',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '125ms',
      data: {
        title: 'Modificar Deposito: ' + deposito.name,
        id: deposito.id,
        name: deposito.name,
        code: deposito.code,
        location: deposito.location,
      },
    });
    _dialog.afterClosed().subscribe((item) => {
      if (item) {
        this.loadDepositos();
      }
    });
  }
}
