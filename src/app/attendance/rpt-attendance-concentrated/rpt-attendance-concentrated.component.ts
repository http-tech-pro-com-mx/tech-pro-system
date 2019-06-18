import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RptAttendanceConcentratedService } from './rpt-attendance-concentrated.service';
import { Anio } from '../../models/anio';
import { Mes } from '../../models/mes';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-rpt-attendance-concentrated',
  templateUrl: './rpt-attendance-concentrated.component.html',
  styleUrls: ['./rpt-attendance-concentrated.component.css']
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
 
  constructor(
    private service: RptAttendanceConcentratedService,
    private fb: FormBuilder
  ) { }



  ngOnInit() {

    this.loading = true;
    
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

    this.submitted = true;  
    this.registros = [];

    if (this.form.valid) {

      this.service.consultaRegistroQuincena(this.params).subscribe(result => {
        console.log(result)
        if (result.successful) {
          
          this.registros = result.reporte;
          this.name_quincena = this.quincenaSelected(this.params.anio, this.params.mes, this.params.quincena);
        
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


  quincenaSelected(id_anio: number, id_mes:number, number_quincena: number): string{
    let anio = ""+this.anios.filter(anio => anio.id_anio == id_anio)[0].anio;
    let mes = this.meses.filter(mes => mes.id_mes == id_mes)[0].mes_descripcion;
    let numero_q = (number_quincena == 1) ? "PRIMERA DE " : "SEGUNDA DE " 
    return numero_q.concat(" ").concat(mes).concat(" ").concat(anio);
  }



}
