import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from '../../utils';
import { Personal } from '../../models/personal';
import { PerfilEmpleadoService } from './perfil-empleado.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Area } from '../../models/area';
import { Perfil } from '../../models/perfil';
import { ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { BASE_URL } from '../../constants';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['../perfil/perfil.component.css'],
  providers: [PerfilEmpleadoService]
})
export class PerfilEmpleadoComponent implements OnInit {

  public section: String;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public personal: Personal;
  public areas: Array<Area>;
  public perfiles: Array<Perfil>;
  public jefes_inmediatos: Array<any>;

  public form: FormGroup;
  public preview: boolean;
  public imagen_seleccionada: File;
  public progreso: number;
  public URL_IMAGEN: string = BASE_URL + '/api/usuarios/getImageProfile';


  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(
    private service: PerfilEmpleadoService,
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.status_message = null;
    this.submitted = false;
    this.section = "PERFIL DEL EMPLEADO";
    this.imagen_seleccionada = null;
    this.preview = false;
    this.areas = [];
    this.perfiles = [];
    this.jefes_inmediatos = [];
    this.progreso = 0;

    let usuario = this.route.snapshot.paramMap.get("username");
    this.personal = new Personal(-1, '', '', '', -1, 'default.png', '', new Area(-1, '', '', -1), new Perfil(-1, '', '', -1));

    this.service.getFindByUser(usuario).subscribe(result => {

      if (result.successful) {
        this.perfiles = result.perfiles;
        this.jefes_inmediatos = result.jefes_inmediatos;
        this.areas = result.areas;
        this.personal = result.getUser.personal;

        if(this.personal.nivel_jerarquico == 1){
          this.jefes_inmediatos  = this.jefes_inmediatos.filter(el => el[0] != this.personal.id_personal);
        } 
        this.status_message = null;

      } else {
        toastr.error(result.message);
        this.status_message = " " + result.message;
      }

      this.ngAfterInit();
      this.loading = false;

    }, error => {
      this.status_message = 'Error: ' + error.status;
      toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
      this.loading = false;
    });

  }

  ngAfterInit() {

    this.form = this.fb.group({
      nombre: new FormControl(this.personal.nombre, [Validators.required, noWhitespaceValidator, Validators.maxLength(40)]),
      apellido_paterno: new FormControl(this.personal.apellido_paterno, [Validators.required, noWhitespaceValidator, Validators.maxLength(60)]),
      apellido_materno: new FormControl(this.personal.apellido_materno, [Validators.maxLength(60)]),
      correo_electronico: new FormControl(this.personal.correo_electronico, [Validators.required, Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/), Validators.maxLength(150)]),
      id_area: new FormControl(this.personal.area.id_area, [Validators.required]),
      id_perfil: new FormControl(this.personal.perfil.id_perfil, [Validators.required]),
      jefe_directo: new FormControl(this.personal.jefe_directo, [])
    });

    setTimeout(function () {
      $.AdminBSB.input.activate();
      $.AdminBSB.select.activate();
    }, 200);

  }




  seleccionImagen(event): void {
    this.progreso = 0;
    this.preview = false;
    this.filePreview(event.target);
  }

  filePreview(input): void {
    if (input.files && input.files[0]) {
      let imagen = input.files[0];
      if ((imagen.size / 1024) < 4096) {


        let reader = new FileReader();
        reader.onload = (e: any) => {
          let img_aux = new Image();
          img_aux.src = e.target.result;
          img_aux.onload = () => {

            if (img_aux.width < 100 || img_aux.height < 100) {
              //La imagen es muy pequeña
              toastr.error('Imagen demasiado pequeña');
            } else if (img_aux.width > 800 || img_aux.height > 800) {
              toastr.error('Imagen demasiado grande');
              //La imagen es muy grande
            } else {
              //vista previa
              this.imagen_seleccionada = imagen;
              this.preview = true;
              setTimeout(() => {
                document.getElementById('container-image').style.setProperty('--url', 'url(' + e.target.result + ')');
              }, 100);
            }

          }
        }
        reader.readAsDataURL(imagen);

      } else {
        toastr.error('Tamaño máximo soportado 4MB');
      }
    }
  }

  closeModal(): void {
    $('#modalChangeImage').modal('hide');
    this.progreso = 0;
    this.myInputVariable.nativeElement.value = "";
    this.imagen_seleccionada = null;
    this.preview = false;
  }



  uploadFile(): void {

    this.service.uploadImagen(this.imagen_seleccionada, this.personal.id_personal).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progreso = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        let response: any = event.body;

        if (response.successful) {

          this.personal.nombre_foto = response.nombre_foto;

          $('#modalChangeImage').modal('hide');
          this.progreso = 0;
          this.myInputVariable.nativeElement.value = "";
          this.imagen_seleccionada = null;
          this.preview = false;
          swal.fire('Exito!', 'Se actualizó la imagen!', 'success');

        } else {
          toastr.error(response.message);
        }

      }

    }, error => {
      toastr.error(error.error.error);
    });

  }

  submitForm(): void {

    this.submitted = true;

    if (this.form.valid) {
      swal.fire({
        title: '<span style="color: #2196f3 ">¿Actualizar información?</span>',
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

          this.service.updateInfoUsuario(this.personal).subscribe((result) => {
            
            if (result.successful) {

              swal.fire('Exito!', result.message, 'success');

            } else {
              toastr.error(result.message);
              this.status_message = " " + result.message;
            }
          }, error => {
            toastr.error('Ocurrió un error al consultar! Error: ' + error.status);
          });

        } else if (result.dismiss === swal.DismissReason.cancel) { }
      })

    } else {
      toastr.error('Verifique los datos capturados!');
    }
  }


}
