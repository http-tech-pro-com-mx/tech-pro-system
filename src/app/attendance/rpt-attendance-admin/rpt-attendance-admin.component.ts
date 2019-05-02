import { Component, OnInit } from '@angular/core';
import { RptAttendanceAdminService } from './rpt-attendance-admin.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Anio } from '../../models/anio';
import { Mes } from '../../models/mes';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-rpt-attendance-admin',
  templateUrl: './rpt-attendance-admin.component.html',
  styleUrls: ['./rpt-attendance-admin.component.css']
})
export class RptAttendanceAdminComponent implements OnInit {

  public section: String;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public anios: Array<Anio>;
  public meses: Array<Mes>;
  public empleados: Array<any>;
  public form: FormGroup;
  public params: any;
  public registros: Array<any>;
  
  constructor( private service: RptAttendanceAdminService,
    private fb: FormBuilder,
    private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.section = "REPORTE ADMINISTRADOR";
    this.status_message = null;
    this.submitted = false;
    this.anios = [];
    this.meses = [];
    this.registros = [];
    this.empleados =[];
    this.params = {
      anio: '',
      mes: '',
      quincena: '',
      badgenumber: ''
    };

    this.service.findAllAnioAndMonthAndEmpleado().subscribe(response => {
      console.log(response)
      if (response.successful) {
        this.empleados = response.empleados;
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
      $.AdminBSB.select.activate();
    }, 100);

  }

}
