import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { Personal } from '../models/personal';
import { BASE_URL} from '../constants';

declare var $: any;
declare var toastr:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public usuario:Usuario;
  public personal: Personal;
  public URL_IMAGEN: string = BASE_URL + '/api/usuarios/getImageProfile/';

  constructor(private router: Router) { }

  ngOnInit() {

    let datos  = JSON.parse(localStorage.getItem('data_user'));
    this.personal = new Personal(datos.id_personal,datos.nombre,datos.apellido_paterno,datos.apellido_materno,datos.genero,datos.nombre_foto,datos.email, datos.id_area, datos.id_perfil);
  }

  ngAfterViewInit() {
    // setTimeout(function () {
       
    //   $.AdminBSB.leftSideBar.activate();
    //   $.AdminBSB.rightSideBar.activate();
    //   $.AdminBSB.navbar.activate();
    //   $.AdminBSB.dropdownMenu.activate();
  
    // }, 150);
  }



  logout(event) {

    try {
      if (localStorage.data_user) {
        localStorage.removeItem('data_user');
      }
    } catch (e) { }

    try {
      if (localStorage.bio2019t3chPr0) {
        localStorage.removeItem('bio2019t3chPr0');
      }
    } catch (e) {
      toastr.error('No se pudo cerrar sesión!');
    }
    this.router.navigate(['login']);
    event.preventDefault();
  }



}
