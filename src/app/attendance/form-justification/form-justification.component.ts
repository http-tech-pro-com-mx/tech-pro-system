import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../app/auth/auth.service';
import { FormJustificationService } from './form-justification.service';
import { Diah } from 'src/app/models/diah';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-form-justification',
  templateUrl: './form-justification.component.html',
  styleUrls: ['./form-justification.component.css']
})
export class FormJustificationComponent implements OnInit {

  public section: string;
  public loading: boolean;
  public status_message: string;
  public form: FormGroup;
  public dias_habiles: Array<Diah>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private service: FormJustificationService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.dias_habiles = [];
    this.section = "JUSTIFICACIÓN";
    this.service.getDayHabiles().subscribe(response =>{
      console.log(response)
      if(response.successful){
        this.status_message = null;
        this.dias_habiles = response.dias_habiles;
      }else{
        toastr.error(response.message);
        this.status_message = " " + response.message;
      }
      this.loading = false;
      this.ngAfterInit();
    }, error =>{
      this.status_message = 'Error: ' + error.status;
      toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
      this.loading = false;
    });
  }

  ngAfterInit() {
    setTimeout(()=>{
      $.AdminBSB.input.activate();
      $('.calendario').datepicker({
        multidate: true,
        format: 'mm/dd/yyyy',
        language: 'es'
      });
    },100);
  }

}
