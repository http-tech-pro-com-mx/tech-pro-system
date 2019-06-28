import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RptAttendanceConcentratedService } from './rpt-attendance-concentrated.service';
import { Anio } from '../../models/anio';
import { Mes } from '../../models/mes';
import { getTablaUtf8 } from '../../utils';
import { configChart as grafica } from './rpt.config.export';
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
  selector: 'app-rpt-attendance-concentrated',
  templateUrl: './rpt-attendance-concentrated.component.html',
  styleUrls: ['./rpt-attendance-concentrated.component.css'],
  animations: [
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
export class RptAttendanceConcentratedComponent implements OnInit {

  public section: String;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public anios: Array<Anio>;
  public meses: Array<Mes>;
  public form: FormGroup;
  public params: any;
  public registros: Array<any>;
  public name_quincena: string;
  public status_animation: string;

  constructor(
    private service: RptAttendanceConcentratedService,
    private fb: FormBuilder
  ) { }



  ngOnInit() {

    this.loading = true;
    this.status_animation = "closed";
    this.status_message = null;
    this.submitted = false;
    this.section = "REPORTE CONCENTRADO";
    this.name_quincena = "";
    this.anios = [];
    this.meses = [];
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
    this.submitted = true;
    this.registros = [];

    if (this.form.valid) {

      this.service.consultaRegistroQuincena(this.params).subscribe(result => {

        if (result.successful) {

          this.registros = result.reporte;

          this.name_quincena = this.quincenaSelected(this.params.anio, this.params.mes, this.params.quincena);

          setTimeout(() => this.status_animation = "open", 100);


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


  quincenaSelected(id_anio: number, id_mes: number, number_quincena: number): string {
    let anio = "" + this.anios.filter(anio => anio.id_anio == id_anio)[0].anio;
    let mes = this.meses.filter(mes => mes.id_mes == id_mes)[0].mes_descripcion;
    let numero_q = (number_quincena == 1) ? "PRIMERA DE " : "SEGUNDA DE "
    return numero_q.concat(" ").concat(mes).concat(" ").concat(anio);
  }

  exportarExcel(): void {

    let linkFile = document.createElement('a');
    let data_type = 'data:application/vnd.ms-excel;';

    if (linkFile.download != undefined) {
      document.body.appendChild(linkFile);
      let tabla = getTablaUtf8('tblReporte');

      linkFile.href = data_type + ', ' + tabla;
      linkFile.download = this.name_quincena;

      linkFile.click();
      linkFile.remove();
    } else {

      let elem = $("#tblReporte")[0].outerHTML;
      let blobObject = new Blob(["\ufeff", elem], { type: 'application/vnd.ms-excel' });
      window.navigator.msSaveBlob(blobObject, this.name_quincena + '.xls');
    }

  }

  helpUserMessage(): void {

    swal.fire({
      type: 'info',
      title: 'Información',
      text: 'Este reporte contiene el conteo global de la quincena seleccionada y solo es visible para usuarios con privilegios de administrador.'
    });

  }

  openModalGrafica(event): void {
    event.preventDefault();
    grafica.series = [];
    grafica.title.text = 'REPORTE CONCENTRADO DE ENTRADAS';
    grafica.subtitle.text =  this.name_quincena;
    grafica.yAxis.max = this.registros[0][1];
    grafica.xAxis.categories = this.registros.map(el=>el[0]);
    const ok = this.registros.map(el=>el[6]);
    const faltas = this.registros.map(el=>el[3]);
    const retardos = this.registros.map(el=>el[4]);

    grafica.series.push({ name: ' FALTAS ', data: faltas, color: '#d32f2f' });
    grafica.series.push({ name: ' RETARDOS ', data: retardos, color: '#ffd740' });
    grafica.series.push({ name: ' OK ', data: ok , color: '#388e3c' });


    $('#divGrafica').highcharts(grafica);
    $('#modalGrafica').modal('show');
  }


  closeModal(): void {
    $('#modalGrafica').modal('hide');
  }



}
