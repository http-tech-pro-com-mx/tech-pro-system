import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../app/auth/auth.service';
import { FormJustificationJefeService } from './form-justification-jefe.service';
import { Justificacion } from '../../models/justificacion';
import { Diah } from '../../models/diah';
import { Personal } from '../../models/personal';
import { noWhitespaceValidator } from '../../utils';
import { Quincena } from 'src/app/models/quincena';
import { Mes } from 'src/app/models/mes';
import { Anio } from 'src/app/models/anio';
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
  selector: 'app-form-justification-jefe',
  templateUrl: './form-justification-jefe.component.html',
  styleUrls: ['./form-justification-jefe.component.css'],
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
        animate('0.5s')
      ]),
    ])
  ]
})
export class FormJustificationJefeComponent implements OnInit {

  public section: string;
  public status_message: string;
  public form: FormGroup;
  public dias: Array<Diah>;
  public justificacion: Justificacion;
  public personal: Personal;
  public submitted: boolean;
  public hasDays: boolean;
  public empleados: Array<any>;
  public loading: boolean;
  public empleados_justificacion: Array<any>;
  public empleados_seleccionados: string;
  public status_animation: string;



  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private service: FormJustificationJefeService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.status_animation = "closed";
    this.dias = [];
    this.personal = new Personal(this.auth.getIdPersonal(), "", "", "", -1, "", "");
    this.justificacion = new Justificacion(-1, "", "", 1, this.dias, this.personal, null, -1, "", null, "");
    this.section = "JUSTIFICAR EMPEADOS";
    this.submitted = false;
    this.hasDays = false;
    this.empleados = [];
    this.empleados_justificacion = [];
    this.empleados_seleccionados = "";

    this.service.findEmpleados().subscribe(response => {

      if (response.successful) {
        this.empleados = response.empleados;
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
      motivo: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.maxLength(100)]),
      descripcion: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.maxLength(500)])
    });

    setTimeout(() => {
      $.AdminBSB.select.activate();
      $.AdminBSB.input.activate();
      $('.calendario').datepicker({
        multidate: true,
        format: 'mm/dd/yyyy',
        language: 'es'
      }).on('changeDate', (ev) => {
        this.hasDays = (ev.dates.length == 0)
      });

      $('.empleados-justificados').on('changed.bs.select', (e, clickedIndex, isSelected, previousValue) => {
        
        this.empleados_justificacion = this.validaPluginSelect($('.empleados-justificados').selectpicker('val'));

        if (this.empleados_justificacion.length > 0) {
          let arg_names = this.empleados.filter(empleado => {
            if (this.empleados_justificacion.includes("" + empleado[0])) return empleado;
          }).map(empleado => empleado[1]);

          this.empleados_seleccionados = arg_names.toString();
        } else {
          this.empleados_seleccionados = "";
        }



      });

      this.status_animation = "open";

    }, 100);
  }

  submit(): void {

    this.submitted = true;
    this.dias = [];
    let dias_seleccionados = $('.calendario').datepicker('getDates');
    // this.empleados_justificacion = this.validaPluginSelect($('.empleados-justificados').selectpicker('val'));
    if (this.form.valid && (dias_seleccionados.length > 0) && (this.empleados_justificacion.length > 0)) {

      dias_seleccionados.forEach(dia => {
        this.dias.push(new Diah(-1, dia, new Quincena(-1, new Mes(-1, "", -1, 1), new Anio(-1, -1, 1), -1, "", "", "", "", -1), -1, -1, "", -1, ""))
      });

      this.justificacion.dias = this.dias;

      swal.fire({
        title: '<span style="color: #2196f3">¿Esta seguro de justificar?</span>',
        html: '<p style="color: #2196f3">Se enviará un correo a TODOS los empleados seleccionados</p>',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0075D3',
        cancelButtonColor: '#2196f3 ',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si!',
        allowOutsideClick: false,
        allowEnterKey: false
      }).then((result) => {
        /*
         * Si acepta
         */
        if (result.value) {

          // this.service.createJustificacion(this.justificacion).subscribe(response => {

          //   if (response.successful) {
          //     swal.fire('Exito !', response.message, 'success');
          //     this.dias = [];
          //     this.personal = new Personal(this.auth.getIdPersonal(), "", "", "", -1, "", "");
          //     this.justificacion = new Justificacion(-1, "", "",1, this.dias, this.personal, null, -1, "", -1, "");
          //     this.submitted = false;
          //     this.hasDays = false;
          //     this.form.reset();
          //     $('.calendario').datepicker('update', '');
          //   } else {
          //     toastr.error(response.message);
          //   }
          // }, error => {
          //   toastr.error('Ocurrió un error al enviar! Error: ' + error.status);

          // });


        } else if (result.dismiss === swal.DismissReason.cancel) { }
      })


    } else {
      this.hasDays = (dias_seleccionados.length == 0);
      toastr.error('Verifique los datos capturados!');
    }
  }

  validaPluginSelect(select:any):Array<any>{
      if(select == null){
        return [];
      }else{
        return select;
      }
  }

}
