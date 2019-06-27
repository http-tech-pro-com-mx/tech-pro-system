import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { Personal } from '../models/personal';
import { BASE_URL } from '../constants';
import { validaTextNull } from '../utils';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public usuario: Usuario;
  public personal: Personal;
  public URL_IMAGEN: string = BASE_URL + '/api/usuarios/getImageProfile/';
  public url: string;
  public permissions: any = {
    consulta_empleados: false,
    consulta_quincena: false,
    rpt_individual: false,
    rpt_admin: false,
    rpt_concentrado: false,
    jst_create: false,
    jft_empleados: false,
    consulta_jst: false
  };
  constructor(private router: Router,
    private auth: AuthService) {
        this.permissions.consulta_empleados = this.auth.hasPermission('ROLE_CONSULTA_USUARIO');
        this.permissions.consulta_quincena = this.auth.hasPermission('ROLE_CONSULTA_QUINCENA');
        this.permissions.rpt_individual = this.auth.hasPermission('ROLE_RPT_INDIVIDUAL');
        this.permissions.rpt_admin = this.auth.hasPermission('ROLE_RPT_ADMIN');
        this.permissions.rpt_concentrado = this.auth.hasPermission('ROLE_RPT_CONCENTRADO');
        this.permissions.jst_create = this.auth.hasPermission('ROLE_CREA_JST');
        this.permissions.jft_empleados = this.auth.hasPermission('ROLE_CREA_JST_EMPLEADO');
        this.permissions.consulta_jst = this.auth.hasPermission('ROLE_CONSULTA_JST');
  }

  ngOnInit() {
    this.url = this.router.url;
    let datos = JSON.parse(localStorage.getItem('data_user'));
    this.personal = new Personal(datos.id_personal, datos.nombre, datos.apellido_paterno, validaTextNull(datos.apellido_materno), datos.genero, datos.nombre_foto, datos.email, datos.id_area, datos.id_perfil);

  }

  ngAfterViewInit() {
    setTimeout(() => {

      $.AdminBSB.leftSideBar.activate();
      $.AdminBSB.rightSideBar.activate();
      $.AdminBSB.navbar.activate();
      $.AdminBSB.dropdownMenu.activate();
      let element_menu = "";
      if (this.url.includes("/home/user/empleados")) {
        element_menu = ".menu-empleados,.empleados-consulta";
      } else if (this.url == "/home/attendance/report") {
        element_menu = ".menu-asistencias,.menu-asistencias-consulta";
      } else if (this.url == "/home/attendance/report-admin") {
        element_menu = ".menu-asistencias,.menu-asistencias-rpt";
      } else if (this.url == "/home/attendance/report-concentrated") {
        element_menu = ".menu-asistencias,.menu-asistencias-c";
      } else if (this.url.includes("/home/attendance/justication/crear")) {
        element_menu = ".menu-justicantes,.menu-justicantes-crear";
      } else if (this.url.includes("/home/attendance/justication/employees/crear")) {
        element_menu = ".menu-justicantes,.menu-justicantes-empl";
      } else if (this.url.includes("/home/attendance/report-justication")) {
        element_menu = ".menu-justicantes,.menu-justicantes-rpt";
      }

      $(element_menu).trigger('click');

    }, 50);
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
