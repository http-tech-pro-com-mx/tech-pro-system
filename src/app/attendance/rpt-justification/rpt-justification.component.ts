import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { RptJustificationService } from './rpt-justification.service';
import { Justificacion } from 'src/app/models/justificacion';
import { dataTableConfigJSON, validaTextNull } from '../../utils';
import swal from 'sweetalert2';
import { Personal } from 'src/app/models/personal';


declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-rpt-justification',
  templateUrl: './rpt-justification.component.html',
  styleUrls: ['./rpt-justification.component.css']
})
export class RptJustificationComponent implements OnInit {

  public section: String;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public busqueda: boolean;
  public justificaciones: Array<Justificacion>;
  public detalle: Justificacion;


  constructor(private service: RptJustificationService,
    private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.section = "JUSTIFICANTES";
    this.status_message = null;
    this.submitted = false;
    this.busqueda = false;
    this.justificaciones = [];
    this.detalle = new Justificacion(-1, "", "", -1, [], new Personal(-1, "", "", "", -1, "", ""));

    this.service.findAllJustificaciones().subscribe(response => {

      if (response.successful) {
        this.status_message = null;
        this.justificaciones = response.justificaciones;
        this.justificaciones.map(justificacion =>{
           justificacion.id_personal.apellido_materno = validaTextNull(justificacion.id_personal.apellido_materno)
        });
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

    setTimeout(function () {

      $('#mainTable').DataTable({
        "language": dataTableConfigJSON,
        "bSort": false
      });

      $.AdminBSB.select.activate();


    }, 80);

  }

  cambiarEstatus(status: number, justificacion: Justificacion, index_row: number,event: any): void {
    let estatus_tmp = justificacion.id_estatus;
    justificacion.id_estatus = status;

    let mensaje = (status == 3) ? 'autorizar' : 'NO autorizar';
    let nombre_solicitante = justificacion.id_personal.nombre + ' ' + justificacion.id_personal.apellido_paterno + ' ' + justificacion.id_personal.apellido_materno;
    swal.fire({
      title: '<span style="color: #2196f3">¿Esta seguro de ' + mensaje + '?</span>',
      html: '<b style="color: #2196f3">A: ' + nombre_solicitante + '</b><br><b style="color: #2196f3">MOTIVO: ' + justificacion.motivo + '</b>',
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

        this.service.autorizar(justificacion.id_justificacion, justificacion.id_estatus).subscribe(response => {
        
          if (response.successful) {
            swal.fire('Exito !', response.message, 'success');
            let update = response.justificacion_update as Justificacion;

            this.justificaciones.map(justificacion => {
              if(justificacion.id_justificacion == update.id_justificacion){
                justificacion = update
              }
              return justificacion;
            }); 
        
            let cell = $('#mainTable').DataTable().cell(index_row, 4 );
            cell.data( update.id_personal_autoriza.nombre +" "+update.id_personal_autoriza.apellido_paterno).draw();

          } else {
            toastr.error('Ocurrió un error! Error: ' + response.message);
          }

        }, error => {
          toastr.error('Ocurrió un error al autorizar! Error: ' + error.status);
        });

      } else if (result.dismiss === swal.DismissReason.cancel) {
        if (estatus_tmp == 1) {
          justificacion.id_estatus = 1;
        } else if (justificacion.id_estatus == 2) {
          justificacion.id_estatus = 3;
        } else if (justificacion.id_estatus == 3) {
          justificacion.id_estatus = 2;
        }
      }
    })
  }

  openModal(justificacion: Justificacion, event): void {
    event.preventDefault();
    this.detalle = justificacion;

    setTimeout(() => {
      $.AdminBSB.input.activate();
    }, 200);

    $('#modalDetalle').modal('show');
  }

  closeModal(): void {
    this.detalle = new Justificacion(-1, "", "", -1, [], new Personal(-1, "", "", "", -1, "", ""));
    $('#modalDetalle').modal('hide');
  }

  helpUserMessage(): void {

    swal.fire({
      type: 'question',
      title: 'Ayuda',
      html: 'Haga <b>clic en el motivo</b> para ver el detalle. <br>'+
      '<b>Estatus disponibles: </b> <br>'+
      '<div><span><i style="font-size:9px"class="material-icons">hourglass_full</i><span> Esperando validación<br>'+
      '<span><i style="font-size:9px"class="material-icons">cancel</i><span> No aprobada<br>'+
      '<span><i style="font-size:9px"class="material-icons">check_circle</i><span> Aprobada </div>'
    });

  }


}
