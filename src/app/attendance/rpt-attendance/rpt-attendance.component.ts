import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { RptAttendanceService } from './rpt-attendance.service';
import { Anio } from '../../models/anio';
import { Mes } from '../../models/mes';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-rpt-attendance',
  templateUrl: './rpt-attendance.component.html',
  styleUrls: ['./rpt-attendance.component.css']
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

  constructor(
    private service: RptAttendanceService,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }



  ngOnInit() {

    this.loading = true;
    this.status_message = null;
    this.submitted = false;
    this.section = "CONSULTA DE ASISTENCIAS";
    this.anios = [];
    this.meses = [];
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

    this.ngAfterInitEffect();

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

  ngAfterInitEffect(): void {
    setTimeout(function () {
      $.AdminBSB.browser.activate();
      $.AdminBSB.leftSideBar.activate();
      $.AdminBSB.rightSideBar.activate();
      $.AdminBSB.navbar.activate();
      $.AdminBSB.dropdownMenu.activate();
    }, 100);

  }

  submit(): void {

    this.submitted = true;

    if (this.form.valid) {

      this.service.consultaRegistroQuincena(this.params).subscribe(result => {
        console.log(result)
      }, error => {
        this.status_message = 'Error: ' + error.status;
        toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
      });

    } else {
      toastr.error('Verifique los datos capturados!');
    }

  }

}
