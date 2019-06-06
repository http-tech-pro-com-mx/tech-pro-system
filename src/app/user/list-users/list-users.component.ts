import { Component, OnInit } from '@angular/core';
import { ListUsersService } from './list-users.service';
import { Usuario } from 'src/app/models/usuario';
import { BASE_URL } from 'src/app/constants';
import { validaTextNull } from '../../utils';
import swal from 'sweetalert2';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public section: String;
  public loading: boolean;
  public status_message: string;
  public empleados: Array<Usuario>;
  public URL_IMAGEN: string = BASE_URL + '/api/usuarios/getImageProfile/';
  public searchText: string;


  constructor(private service: ListUsersService) { }

  ngOnInit() {

    this.loading = true;
    this.status_message = null;
    this.section = "CONSULTA EMPLEADOS";
    this.empleados = [];
    this.searchText = "";

    this.service.getAllEmpleados().subscribe(response => {
   
      if (response.successful) {
        this.status_message = null;
        this.empleados = response.lista_empleados;
      } else {
        toastr.error(response.message);
        this.status_message = " " + response.message;
      }

      this.loading = false;
      this.ngAfterInitEffectForm();

    }, error => {
      this.status_message = 'Error: ' + error.status;
      toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
      this.loading = false;
    });


  }

  ngAfterInitEffectForm(): void {
    setTimeout(function () {
      $.AdminBSB.input.activate();
    }, 100);

  }

  changeEstatusEmp(empleado: Usuario): void {
    let mensaje = empleado.estatus ? 'baja' : 'alta';
    let name = empleado.personal.nombre + ' ' + empleado.personal.apellido_paterno + ' ' + validaTextNull(empleado.personal.apellido_materno);
    swal.fire({
      title: '<span style="color: #ffb74d">¿Desea dar de ' + mensaje + '?</span>',
      html: '<p style="color: #ffb74d">A: ' + name + '</p>',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffb74d',
      cancelButtonColor: '#ffa726 ',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si!',
      allowOutsideClick: false,
      allowEnterKey: false
    }).then((result) => {
      /*
       * Si acepta
       */
      if (result.value) {

        this.service.updateEstatus(empleado.id_usuario, empleado.estatus).subscribe(response => {
          
          if (response.successful) {
            empleado.estatus = !empleado.estatus;
            swal.fire('Exito !', response.message, 'success');
          } else {
            toastr.error(response.message);
          }
        }, error => {
          toastr.error('Ocurrió un error al consultar! Error: ' + error.status);

        });
      } else if (result.dismiss === swal.DismissReason.cancel) { }
    })
  }

}
