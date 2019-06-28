import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { RptAttendanceService } from './rpt-attendance.service';
import { Anio } from '../../models/anio';
import { Mes } from '../../models/mes';
import * as highcharts from 'highcharts';
import { configChart as grafica } from './rpt.config.export';
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
  selector: 'app-rpt-attendance',
  templateUrl: './rpt-attendance.component.html',
  styleUrls: ['./rpt-attendance.component.css'],
  animations:[
    trigger('status_animation', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0.2,
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
export class RptAttendanceComponent implements OnInit {

  public section: String;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public anios: Array<Anio>;
  public meses: Array<Mes>;
  public form: FormGroup;
  public params: any;
  public registros: Array<any>;
  public total_retardos: number;
  public total_no_check: number;
  public total_ok: number;
  public total_faltas: number;
  public descuento_retardos: number;
  public busqueda: boolean;
  public registros_comidas: Array<any>;
  public status_animation: string;


  constructor(
    private service: RptAttendanceService,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }



  ngOnInit() {

    this.loading = true;
    this.busqueda = false;
    this.status_message = null;
    this.submitted = false;
    this.status_animation = "closed";
    this.section = "MIS ASISTENCIAS";
    this.anios = [];
    this.meses = [];
    this.registros_comidas = [];
    this.total_retardos = 0;
    this.total_no_check = 0;
    this.total_ok = 0;
    this.total_faltas = 0;
    this.descuento_retardos = 0;
    this.registros = [];
    this.params = {
      anio: '',
      mes: '',
      quincena: ''
    };

    this.service.findAllAnioAndMonth().subscribe(response => {
      if (response.successful) {

        this.meses = response.meses;
        this.anios = response.anios;
        this.status_message = null;

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

    this.form = this.fb.group({
      anio: new FormControl('', [Validators.required]),
      mes: new FormControl('', [Validators.required]),
      quincena: new FormControl('', [Validators.required])
    });

    setTimeout(function () {
      $.AdminBSB.input.activate();
      $.AdminBSB.select.activate();
    }, 100);

  }


  submit(): void {
    this.status_animation = "closed";
    this.busqueda = false;
    this.submitted = true;
    this.total_retardos = 0;
    this.total_no_check = 0;
    this.total_ok = 0;
    this.total_faltas = 0;
    this.descuento_retardos = 0;
    this.descuento_retardos = 0;
    this.registros = [];
    this.registros_comidas = [];

    if (this.form.valid) {

      this.service.consultaRegistroQuincena(this.params, this.auth.getUserid()).subscribe(result => {

        if (result.successful) {
          this.registros_comidas = result.hora_comida;
          this.registros = result.entrada_salida;
          this.total_retardos = this.registros.filter(el => el[3] == "RETARDO" || el[3] == "JUSTIFICACIÓN NO APROBADA").length;
          this.total_no_check = this.registros.filter(el => el[3] == "NO CHECO ENTRADA").length;
          this.total_ok = this.registros.filter(el => el[3] == "OK").length;
          this.total_faltas = this.registros.filter(el => el[3] == "FALTA" ||  el[3] == "FALTA NO JUSTIFICADA").length;
          this.descuento_retardos = this.total_retardos / 3;
          this.descuento_retardos = parseInt("" + this.descuento_retardos) + this.total_faltas;
          this.busqueda = true;
          setTimeout(()=> this.status_animation = "open", 100);
        } else {
          toastr.error('Ocurrió un error al consultar! Error: ' + result.message);

        }
      }, error => {
        this.status_message = 'Error: ' + error.status;
        toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
      });

    } else {
      toastr.error('Verifique los datos capturados!');
    }

  }

  openModalGrafica(event): void {
    event.preventDefault();
    grafica.series = [];
    grafica.title.text = 'HORARIO LABORAL (ENTRADAS)';

    grafica.series = [
      { name: 'OK', data: [this.total_ok], color: '#388e3c' },
      { name: 'RETARDOS', data: [this.total_retardos], color: '#ffd740' },
      { name: 'FALTAS', data: [this.total_faltas], color: '#d32f2f' },
      { name: 'JUSTIFICADOS', data: [0] },
      { name: 'NO CHECK IN', data: [this.total_no_check] }]


    $('#divGrafica').highcharts(grafica);
    $('#modalGrafica').modal('show');
  }

  closeModal(): void {
    $('#modalGrafica').modal('hide');
  }
}
