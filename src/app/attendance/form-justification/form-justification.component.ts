import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../app/auth/auth.service';
import { FormJustificationService } from './form-justification.service';
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
  selector: 'app-form-justification',
  templateUrl: './form-justification.component.html',
  styleUrls: ['../form-justification-jefe/form-justification-jefe.component.css'],
  animations:[
    trigger('status_animation', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.2,
        transform: 'translateX(-50px)'
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
export class FormJustificationComponent implements OnInit {

  public section: string;
  public status_message: string;
  public form: FormGroup;
  public dias: Array<Diah>;
  public justificacion: Justificacion;
  public personal: Personal;
  public submitted: boolean;
  public hasDays: boolean;
  public status_animation: string;
  public disabled_btn: boolean;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private service: FormJustificationService
  ) { }

  ngOnInit() {
    this.disabled_btn = false;
    this.status_animation = "closed";
    this.dias = [];
    this.personal = new Personal(this.auth.getIdPersonal(), "", "", "", -1, "", "");
    this.justificacion = new Justificacion(-1, "", "",1, this.dias, this.personal, null, -1, "",null, "");
    this.section = "JUSTIFICANTE";
    this.submitted = false;
    this.hasDays = false;

    this.form = this.fb.group({
      motivo: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.maxLength(100)]),
      descripcion: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.minLength(5), Validators.maxLength(500)])
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

      this.status_animation = "open";

    }, 100);


  }

  submit(): void {
    this.submitted = true;
    this.dias = [];
    let dias_seleccionados = $('.calendario').datepicker('getDates');
    if (this.form.valid && (dias_seleccionados.length > 0)) {

      dias_seleccionados.forEach(dia => {
        this.dias.push(new Diah(-1, dia, new Quincena(-1, new Mes(-1, "", -1, 1), new Anio(-1, -1, 1), -1, "", "", "", "", -1), -1, -1, "", -1, ""))
      });

      this.justificacion.dias = this.dias;

      swal.fire({
        title: '<span style="color: #2196f3">¿Esta seguro de enviar?</span>',
        html: '<p style="color: #2196f3">Su jefe recibirá un correo electrónico para validar su registro</p>',
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

          this.disabled_btn = true;
          this.service.createJustificacion(this.justificacion).subscribe(response => {

            if (response.successful) {
              swal.fire('Exito !', response.message, 'success');
              this.dias = [];
              this.personal = new Personal(this.auth.getIdPersonal(), "", "", "", -1, "", "");
              this.justificacion = new Justificacion(-1, "", "",1, this.dias, this.personal, null, -1, "", -1, "");
              this.submitted = false;
              this.hasDays = false;
              this.form.reset();
              $('.calendario').datepicker('update', '');
              $('.motivo-justificacion').selectpicker('refresh');
              this.disabled_btn = false;
             
            } else {
              toastr.error(response.message);
              this.disabled_btn = false;
            }

           
          }, error => {
            toastr.error('Ocurrió un error al enviar! Error: ' + error.status);
            this.disabled_btn = false;
          });


        } else if (result.dismiss === swal.DismissReason.cancel) { }
      })


    } else {
      this.hasDays = (dias_seleccionados.length == 0);
      toastr.error('Verifique los datos capturados!');
    }
  }

  helpUserMessage(): void {

    swal.fire({
      type: 'question',
      title: 'Ayuda',
      html: 'Ingrese todos los datos del formulario y haga clic en el botón <b>ENVIAR</b>.'+
            'Su jefe inmediato será notificado a tráves de un email para validar<br>'+
            'Puede ver el estatus de esta justificación en la sección de <b>CONSULTA</b>'
    });

  }




}
