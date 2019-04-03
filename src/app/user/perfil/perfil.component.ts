import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Personal } from '../../models/personal';
import { PerfilService } from './perfil.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Area } from '../../models/area';
import { Perfil } from '../../models/perfil';

declare var $: any;
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

    this.personal = new Personal(-1, '', '', '', -1, '', new Area(-1, '', '', -1), new Perfil(-1, '', '', -1));

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
    console.log(this.form)

    if (this.form.valid) {

    } else {

      if (this.form.errors && this.form.errors.notSame) {
          toastr.error('Las contraseñas no coinciden');
      }else{
        toastr.error('Verifique los datos capturados!');
      } 
    }
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.nueva.value;
    let confirmPass = group.controls.confirmacion.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
