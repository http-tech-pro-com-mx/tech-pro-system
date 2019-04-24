import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Personal } from '../../models/personal';
import { PerfilService } from './perfil.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Area } from '../../models/area';
import { Perfil } from '../../models/perfil';
import swal from 'sweetalert2';

declare var $: any;
declare var Dropzone: any;
declare var toastr: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [PerfilService]
})
export class PerfilComponent implements OnInit {

  public section: String;
  public loading: boolean;
  public status_message: string;
  public submitted: boolean;
  public personal: Personal;
  public areas: Array<Area>;
  public contrasenias: any;
  public form: FormGroup;


  constructor(
    private service: PerfilService,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.status_message = null;
    this.submitted = false;
    this.section = "MI PERFIL";
    this.areas = [];
    this.contrasenias = {
      actual: '',
      nueva: '',
      confirmacion: ''
    };

    this.personal = new Personal(-1, '', '', '', -1, 'default.png', '', new Area(-1, '', '', -1), new Perfil(-1, '', '', -1));

    this.service.getFindByUser(this.auth.getUserName()).subscribe(result => {

      if (result.successful) {

        this.areas = result.areas;
        this.personal = result.getUser.personal;
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

    setTimeout(function () {
      $.AdminBSB.browser.activate();
      $.AdminBSB.input.activate();
      $.AdminBSB.select.activate();

      $.AdminBSB.leftSideBar.activate();
      $.AdminBSB.rightSideBar.activate();
      $.AdminBSB.navbar.activate();
      $.AdminBSB.dropdownMenu.activate();

    }, 150);
  }

  ngAfterInit() {

    this.form = this.fb.group({
      actual: new FormControl('', [Validators.required]),
      nueva: new FormControl('', [Validators.required]),
      confirmacion: new FormControl('', [])
    }, { validator: this.checkPasswords });

  }

  changePassword() {

    this.submitted = true;

    if (this.form.valid) {
      swal.fire({
        title: '<span style="color: #2196f3 ">¿Desea cambiar su contraseña?</span>',
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

          this.service.changePassword(this.contrasenias).subscribe(result => {

            if (result.successful) {
              this.contrasenias.actual = '';
              this.contrasenias.nueva = '';
              this.contrasenias.confirmacion = '';
              this.submitted = false;
              this.form.reset();
              swal.fire('Exito !', result.message, 'success');
            } else {
              toastr.error(result.message);
            }
          }, error => {

            if (error.status == 403) {
              toastr.error('No tiene permiso para realizar esta acción');
            } else {
              toastr.error('Ocurrió un error! Error: ' + error.status);
            }

          });

        } else if (result.dismiss === swal.DismissReason.cancel) { }
      })
    } else if (this.form.errors && this.form.errors.notSame) {
      toastr.error('Las contraseñas no coinciden');
    } else {
      toastr.error('Verifique los datos capturados!');
    }
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.nueva.value;
    let confirmPass = group.controls.confirmacion.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  seleccionImagen(event): void {
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
          img_aux.onload = function () {

            if (img_aux.width < 100 || img_aux.height < 100) {
              //La imagen es muy pequeña
              toastr.error('Imagen demasiado pequeña');
            } else if (img_aux.width > 800 || img_aux.height > 800) {
              toastr.error('Imagen demasiado grande');
              //La imagen es muy grande
            } else {
              //vista previa
            }

          }
        }
        reader.readAsDataURL(imagen);

      } else {
        toastr.error('Tamaño máximo soportado 4MB');
      }
    }
  }

}
