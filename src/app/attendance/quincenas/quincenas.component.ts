import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { QuincenasService } from './quincenas.service';
import { AuthService } from '../../auth/auth.service';
import { Quincena } from '../../models/quincena';
import { Diah } from '../../models/diah';
import { Anio } from '../../models/anio';
import { Mes } from '../../models/mes';
import swal from 'sweetalert2';


declare var $: any;
declare var toastr: any;
@Component({
  selector: 'quincenas',
  templateUrl: './quincenas.component.html',
  styleUrls: ['./quincenas.component.css']
})
export class QuincenaComponent implements OnInit {

  public section: string;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public quincenas: Array<Quincena>;
  public dias_by_quincena: Array<Diah>;
  public consulta_dias: boolean;
  public anios: Array<Anio>;
  public meses: Array<Mes>;
  public quincena: Quincena;
  public dias_habiles: Array<Diah>;
  public isEdit: boolean;
  public disabled_btn: boolean;
  public permissions: any ={
    create: false,
    edit: false
  };


  constructor(private service: QuincenasService,
    private fb: FormBuilder,
    private auth: AuthService) { }

  ngOnInit() {

    this.loading = true;
    this.permissions.create = this.auth.hasPermission('ROLE_CREA_QUINCENA');
    this.permissions.edit = this.auth.hasPermission('ROLE_MODIFICA_QUINCENA');
    this.section = "CONFIGURACIÓN";
    this.status_message = null;
    this.submitted = false;
    this.disabled_btn = false;
    this.quincenas = [];
    this.dias_by_quincena = [];
    this.meses = [];
    this.anios = [];
    this.consulta_dias = false;
    let mes = new Mes(-1, "SIN MES", -1, -1);
    let anio = new Anio(-1, 1990, -1);
    this.quincena = new Quincena(-1, mes, anio, -1, "09:05", "14:00", "16:00", "18:00", 1);
    this.dias_habiles = [];
    this.isEdit = false;


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



    setTimeout(() => {
      $.AdminBSB.select.activate();


      $('#demo').steps({
        onChange: (currentIndex, newIndex, stepDirection) => {
          if (currentIndex == 0) {

            if (this.quincena.numero_quincena != -1 && this.quincena.id_mes.id_mes != -1 && this.quincena.id_anio.id_anio != -1) {
              return true;
            } else {
              toastr.error("Seleccione todos los datos");
              return false;
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

  closeModal(bandera: boolean): void {


    this.isEdit = false;
    $('#modalQuincena').modal('hide');

    this.dias_habiles = [];
    $('.calendario').datepicker('update', '');
    $('#click_reset').trigger('click');

    let mes = new Mes(-1, "SIN MES", -1, -1);
    let anio = new Anio(-1, 1990, -1);
    this.quincena = new Quincena(-1, mes, anio, -1, "09:05", "14:00", "16:00", "18:00", 1);

    if (bandera) {
      $('select').selectpicker('val', '-1');
    }

  }

  isEmpty(text: string): boolean {
    return /^\s*$/.test("" + text.trim())
  }

  convertToSecond(hora_text: string): number {
    let a = hora_text.split(':');
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
    return seconds;
  }

  sendQuincena(): void {

    let dias_seleccionados = $('.calendario').datepicker('getDates');
    if (dias_seleccionados.length > 0) {

      this.dias_habiles = [];

      dias_seleccionados.forEach(dia => {
        this.dias_habiles.push(new Diah(-1, dia, this.quincena, 1));
      });

      if (this.isEdit) {
        swal.fire({
          title: '<span style="color: #2196f3 ">¿Desea actualizar los datos?</span>',
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
            this.service.updateQuincena(this.quincena, this.dias_habiles).subscribe(response => {
              
              if (response.successful) {
                let quincena_update = response.quincena_update as Quincena;
               
                this.quincenas = this.quincenas.map(el=>{
                  if(el.id_quincena ==  quincena_update.id_quincena){
                      return el = quincena_update
                  }else{
                    return el;
                  }
                });
                swal.fire('Exito !', response.message, 'success');
                this.disabled_btn = false;
              } else {
                toastr.error(response.message);
                this.disabled_btn = false;
              }
            }, error => {
              toastr.error('Ocurrió un error al actualizar! Error: ' + error.status);
              this.disabled_btn = false;
            });
          } else if (result.dismiss === swal.DismissReason.cancel) { }
        })

      } else {
        this.disabled_btn = true;
        this.service.createQuincena(this.quincena, this.dias_habiles).subscribe(response => {

          if (response.successful) {
            this.quincenas.push(response.quincena);
            $('select').selectpicker('val', '-1');
            swal.fire('Exito !', response.message, 'success');
            this.disabled_btn = false;
            this.closeModal(false);
          } else {
            toastr.error(response.message);
            this.disabled_btn = false;
          }
        }, error => {
          toastr.error('Ocurrió un error al crear! Error: ' + error.status);
          this.disabled_btn = false;
        });
      }

    } else {
      toastr.error("Seleccione los días de quincena");
    }


  }

  editaQuincena(quincena: Quincena): void {
    this.isEdit = true;
    this.quincena = JSON.parse(JSON.stringify(quincena));
    $('select.numero_quincena').selectpicker('val', this.quincena.numero_quincena);
    $('select.mes_quincena').selectpicker('val', this.quincena.id_mes.id_mes);
    $('select.anio_quincena').selectpicker('val', this.quincena.id_anio.id_anio);
    this.service.getFindDayByIdQuincena(this.quincena.id_quincena).subscribe(response => {

      if (response.successful) {
        $('#modalQuincena').modal('show');
        let dias: Array<any> = response.dias_habiles;
        dias = dias.map(el => {
          let fecha_tmp = el.fecha.split("T")[0].split("-");
          return fecha_tmp[1] + "/" + fecha_tmp[2] + "/" + fecha_tmp[0];
        });
        $('.calendario').datepicker('setDates', dias);

      } else {
        toastr.error(response.message);

      }
    }, error => {
      toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
    });

  }

  getTextoBtn(): string{
    if(this.disabled_btn){
      return "PROCESANDO"
    }else{
      return (!this.isEdit)? "REGISTRAR" : "ACTUALIZAR";
    }
  }


}
