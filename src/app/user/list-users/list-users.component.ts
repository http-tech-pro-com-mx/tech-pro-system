import { Component, OnInit } from '@angular/core';
import { ListUsersService } from './list-users.service';
import { AuthService } from '../../auth/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { BASE_URL } from 'src/app/constants';
import { validaTextNull } from '../../utils';
import swal from 'sweetalert2';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  animations:[
    trigger('status_animation', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.2,
        transform: 'translateY(-50px)'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ])
  ]
})
export class ListUsersComponent implements OnInit {

  public section: String;
  public loading: boolean;
  public status_message: string;
  public empleados: Array<Usuario>;
  public URL_IMAGEN: string = BASE_URL + '/api/usuarios/getImageProfile/';
  public searchText: string;
  public status_animation: string;
  public permissions: any ={
    activate: false
  };


  constructor(private service: ListUsersService,
    private auth: AuthService
    ) { }

  ngOnInit() {

    this.loading = true;
    this.permissions.activate = this.auth.hasPermission('ROLE_ACTIVA_USUARIO');
    this.status_message = null;
    this.section = "CONSULTA EMPLEADOS";
    this.empleados = [];
    this.searchText = "";
    this.status_animation = "closed";

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
    setTimeout( () =>{
      this.status_animation = "open";
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
