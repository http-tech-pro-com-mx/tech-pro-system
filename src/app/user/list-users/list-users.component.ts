import { Component, OnInit } from '@angular/core';
import { ListUsersService } from './list-users.service';
import { Usuario } from 'src/app/models/usuario';
import { BASE_URL } from 'src/app/constants';


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


  constructor(private service: ListUsersService) { }

  ngOnInit() {

    this.loading = true;
    this.status_message = null;
    this.section = "CONSULTA EMPLEADOS";
    this.empleados = [];

    this.service.getAllEmpleados().subscribe(response => {
      console.log(response);
      if (response.successful) {
        this.status_message = null;
        this.empleados = response.lista_empleados;
      } else {
        toastr.error(response.message);
        this.status_message = " " + response.message;
      }

      this.loading = false;
    }, error => {
      this.status_message = 'Error: ' + error.status;
      toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
      this.loading = false;
    });


  }

}
