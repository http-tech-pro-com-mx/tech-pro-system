import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { LoginService } from './login.service';


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
      contrasenia: new FormControl([Validators.required])
    });
  }

  login() {
    this.mensaje_error = "";
    this.submitted = true;

    if (this.formLogin.valid) {
      
      this.disabled = true;
      this.service.login(this.usuario).subscribe(result => {
        console.log(result)
        if (result.response.sucessfull) {
          if (typeof (Storage) !== "undefined") {
            this.usuario = result.response.usuario;
            //localStorage.setItem('bio2019t3chPr0', this.usuario.token);
            localStorage.setItem('data_user', JSON.stringify(this.usuario));
            this.router.navigate(['home']);
          } else {
            //Materialize.toast('LocalStorage no soportado en este navegador!', 4000, 'red');
          }
        } else {
          this.mensaje_error = result.response.message;
          //Materialize.toast(this.mensaje_error, 3000, 'red');
        }
        this.disabled = false;
      }, error => {
        console.log(error)
        this.disabled = false;
        //Materialize.toast('Ocurrió  un error en el servicio!', 4000, 'red');
      });

    } else {
      //Materialize.toast('Verifique los datos capturados!', 4000, 'red');
      alert('Verfique los datos capturados!')
    }

  }

  resetMensaje() {
    this.mensaje_error = "";
  }

}
