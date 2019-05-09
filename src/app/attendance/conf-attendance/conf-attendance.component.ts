import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfAttendanceService } from './conf-attendance.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Quincena } from 'src/app/models/quincena';
import { Diah } from 'src/app/models/diah';



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
    this.consulta_dias = false;


    this.service.findAllQuincenas().subscribe(response => {

      if (response.successful) {
        this.quincenas = response.quincenas;
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

    setTimeout(function () {
      $.AdminBSB.select.activate();
      $('.calendario').datepicker({
        multidate:true,
        language: 'es'
      });
    }, 100);

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

}
