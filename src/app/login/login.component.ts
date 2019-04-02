import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { LoginService } from './login.service';

declare var toastr:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public submitted: boolean;
  public mensaje_error: string;
  public disabled: boolean;
  public usuario: Usuario;


  constructor(private service: LoginService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.usuario = new Usuario(-1, '', '',-1, false);
    this.mensaje_error = "";
    this.submitted = false;
    this.disabled = false;
    this.formLogin = this.fb.group({
      usuario: new FormControl('',[Validators.required]),
      contrasenia: new FormControl('',[Validators.required])
    });
  }

  login() {
    this.mensaje_error = "";
    this.submitted = true;

    if (this.formLogin.valid) {
      console.log(this.usuario)
      this.disabled = true;
      this.service.login(this.usuario).subscribe(result => {
      
        if (result.access_token) {
          if (typeof (Storage) !== "undefined") {
            localStorage.setItem('bio2019t3chPr0', result.access_token);
            localStorage.setItem('data_user', JSON.stringify(result));
            this.router.navigate(['home']);
          } else {
            toastr.error('LocalStorage no soportado en este navegador!');
          }
        } else {
          this.mensaje_error = result.response.message;
          toastr.error('Error en el inicio de sesión!')
        }
        this.disabled = false;
      }, error => {
        this.disabled = false;
        toastr.error('Usuario o contraseña incorrectos!');
      });

    } else {
      toastr.error('Verifique los datos capturados!');
    }

  }

  resetMensaje() {
    this.mensaje_error = "";
  }

}
