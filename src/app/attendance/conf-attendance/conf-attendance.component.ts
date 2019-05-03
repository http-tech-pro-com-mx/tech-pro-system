import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfAttendanceService } from './conf-attendance.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Quincena } from 'src/app/models/quincena';


declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-conf-attendance',
  templateUrl: './conf-attendance.component.html',
  styleUrls: ['./conf-attendance.component.css']
})
export class ConfAttendanceComponent implements OnInit {

  public section:string;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public form: FormGroup;
  public quincenas: Array<Quincena>;

  constructor(private service: ConfAttendanceService,
    private fb: FormBuilder,
    private auth: AuthService) { }

  ngOnInit() {
    
    this.loading = true;
    this.section = "CONFIGURACIÓN";
    this.status_message = null;
    this.submitted = false;
    this.quincenas = [];

    this.service.findAllQuincenas().subscribe(response => {
      console.log('quincenas',response)
      if (response.successful) {
        this.quincenas = response.quincenas;
        this.status_message = null;

      } else {
        toastr.error(response.message);
        this.status_message = " " + response.message;
      }

      this.loading = false;

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
    }, 100);

  }

  consultaDiasHabiles(id_quincena: number, event): void{
    event.preventDefault();
    alert('Consulta para quincena: '+ id_quincena)
  }

}
