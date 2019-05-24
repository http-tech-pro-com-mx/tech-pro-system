import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../app/auth/auth.service';
import { FormJustificationService } from './form-justification.service';
import { Justificacion } from '../../models/justificacion';
import { Diah } from '../../models/diah';
import { Personal } from '../../models/personal';
import { noWhitespaceValidator  } from '../../utils';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-form-justification',
  templateUrl: './form-justification.component.html',
  styleUrls: ['./form-justification.component.css']
})
export class FormJustificationComponent implements OnInit {

  public section: string;
  public status_message: string;
  public form: FormGroup;
  public dias: Array<Diah>;
  public justificacion: Justificacion;
  public personal: Personal;
  public submitted:boolean;
  public hasDays: boolean;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private service: FormJustificationService
  ) { }

  ngOnInit() {
    this.dias = [];
    this.personal = new Personal(this.auth.getIdPersonal(), "", "", "", -1, "", "");
    this.justificacion = new Justificacion(-1, "", "", -1, this.dias, this.personal)
    this.section = "JUSTIFICACIÓN";
    this.submitted = false;
    this.hasDays = false;

    this.form = this.fb.group({
      motivo: new FormControl('', [Validators.required, noWhitespaceValidator , Validators.maxLength(100)]),
      descripcion: new FormControl('', [Validators.required, noWhitespaceValidator , Validators.maxLength(500)])
    });

    setTimeout(() => {
      $.AdminBSB.input.activate();
      $('.calendario').datepicker({
        multidate: true,
        format: 'mm/dd/yyyy',
        language: 'es'
      }).on('changeDate', (ev) => {
           this.hasDays = (ev.dates.length == 0)
      });

      
    }, 100);


  }

  submit(): void {
    this.submitted = true;
    let dias_seleccionados = $('.calendario').datepicker('getDates');
    debugger
    if (this.form.valid && (dias_seleccionados.length > 0)) {

       this.service.createJustificacion(this.justificacion).subscribe(response =>{
          console.log(response)
       }, error =>{
        console.log('Ocurrio un error',error)
       });

    } else {
      this.hasDays = (dias_seleccionados.length == 0);
      toastr.error('Verifique los datos capturados!');
    }
  }



}
