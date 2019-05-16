import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfAttendanceService } from './conf-attendance.service';
import { AuthService } from '../../auth/auth.service';
import { Quincena } from '../../models/quincena';
import { Diah } from '../../models/diah';
import { Anio } from '../../models/anio';
import { Mes } from '../../models/mes';
import swal from 'sweetalert2';


declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-conf-attendance',
  templateUrl: './conf-attendance.component.html',
  styleUrls: ['./conf-attendance.component.css']
})
export class ConfAttendanceComponent implements OnInit {

  public section: string;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public form: FormGroup;
  public quincenas: Array<Quincena>;
  public dias_by_quincena: Array<Diah>;
  public consulta_dias: boolean;
  public anios: Array<Anio>;
  public meses: Array<Mes>;
  public quincena: Quincena;


  constructor(private service: ConfAttendanceService,
    private fb: FormBuilder,
    private auth: AuthService) { }

  ngOnInit() {

    this.loading = true;
    this.section = "CONFIGURACIÓN";
    this.status_message = null;
    this.submitted = false;
    this.quincenas = [];
    this.dias_by_quincena = [];
    this.meses = [];
    this.anios = [];
    this.consulta_dias = false;
    let mes = new Mes(-1, "SIN MES", -1, -1);
    let anio = new Anio(-1, 1990, -1);
    this.quincena = new Quincena(-1, mes, anio, -1, "09:05", "14:00", "16:00", "18:00", 1);


    this.service.findAllQuincenas().subscribe(response => {

      if (response.successful) {
        this.quincenas = response.quincenas;
        this.anios = response.anios;
        this.meses = response.meses;
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
      quincena: new FormControl('', [Validators.required]),
      id_personal: new FormControl('', [Validators.required])
    });

    setTimeout(() => {
      $.AdminBSB.select.activate();


      $('#demo').steps({
        onChange: (currentIndex, newIndex, stepDirection) => {
          if (currentIndex == 0) {
            if (this.quincena.numero_quincena == -1 || this.quincena.id_mes.id_mes == -1 || this.quincena.id_mes.id_mes == -1) {
              toastr.error("Seleccione todos los datos");
              return false;
            } else {
              return true;
            }
          } else if (currentIndex == 1) {

            if (this.isEmpty(this.quincena.hora_entrada) ||
              this.isEmpty(this.quincena.hora_salida) ||
              this.isEmpty(this.quincena.hora_salida_comida) ||
              this.isEmpty(this.quincena.hora_entrada_comida)) {

              toastr.error("Ingrese todos los horarios");
              return false;

            } else {

              if (this.convertToSecond(this.quincena.hora_entrada) >= this.convertToSecond(this.quincena.hora_salida)) {
                toastr.error("Hora de entrada y salida no validas");
                return false;
              } else if (this.convertToSecond(this.quincena.hora_salida_comida) >= this.convertToSecond(this.quincena.hora_entrada_comida)) {
                toastr.error("Horario de comida no valido");
                return false;
              } else {
                return true;
              }

            }

          } else if (currentIndex == 2) {
            return false;
          }

        }
      });

      $('.calendario').datepicker({
        multidate: true,
        format: 'mm/dd/yyyy',
        language: 'es'
      });


    }, 200);

  }

  consultaDiasHabiles(id_quincena: number, event): void {
    event.preventDefault();
    this.consulta_dias = false;
    this.service.getFindDayByIdQuincena(id_quincena).subscribe(response => {

      if (response.successful) {
        this.consulta_dias = true;
        this.dias_by_quincena = response.dias_habiles;
      } else {
        toastr.error(response.message);

      }
    }, error => {
      toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
    });
  }

  borraDias(): void {
    this.consulta_dias = false;
  }

  modalQuincena(quincea: Quincena, event): void {
    event.preventDefault();
    $('#modalQuincena').modal('show');
    this.ngAfterInitEffectForm()
  }

  closeModal(): void {
    $('#modalQuincena').modal('hide');
  }

  isEmpty(text: string): boolean {
    return /^\s*$/.test("" + text.trim())
  }

  convertToSecond(hora_text: string): number {
    let a = hora_text.split(':');
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
    return seconds;
  }

  registraQuincena(): void {

    let dias_seleccionados = $('.calendario').datepicker('getDates');

    if (dias_seleccionados.length > 0) {

      let dias_habiles: Array<Diah> = [];

      dias_seleccionados.forEach(dia => {
        dias_habiles.push(new Diah(-1, dia, this.quincena));
      });
      console.log(this.quincena, dias_habiles)
      this.service.createQuincena(this.quincena, dias_habiles).subscribe(response => {
        console.log(response);
        if (response.successful) {
          swal.fire('Exito !', response.message, 'success');
        } else {
          toastr.error(response.message);
        }
      }, error => {
        toastr.error('Ocurrió un error al crear! Error: ' + error.status);
      });

    } else {
      toastr.error("Seleccione los días de quincena");
    }
  }

}
