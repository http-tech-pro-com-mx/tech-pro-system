import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';
import swal from 'sweetalert2';


declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public correo_electronico: string;
  public valid_email: boolean;
  public mensaje_error: string;
  public disabled_btn: boolean;

  constructor(
    private service: ForgotPasswordService,
    private router: Router
    ) { }

  ngOnInit() {
    this.correo_electronico = "";
    this.mensaje_error = "";
    this.disabled_btn = false;
    
  }

  recoveryPwd(){
    this.disabled_btn = true;
    this.mensaje_error = "";
    if(this.correo_electronico == null || this.correo_electronico == undefined || this.correo_electronico == ""){
      this.mensaje_error = "Ingrese correo";
      this.disabled_btn = false;

    }else if(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/.test(this.correo_electronico)){
      
      this.service.recoveryPwd(this.correo_electronico).subscribe(response =>{
        if (response.successful) {
          this.correo_electronico = "";
          this.mensaje_error = ""; 
          swal.fire('Exito!', 'Se envió tu nueva contraseña al correo electrónico!', 'success');

        } else {
            toastr.error(response.message);
          }
        this.disabled_btn = false;
      }, error=>{
        toastr.error('Ocurrió un error al recuperar contraseña! Error: ' + error.status);
        this.disabled_btn = false;
      });

    }else{
      this.mensaje_error = "Correo no válido";
      this.disabled_btn = false;
    }
  }

  keyPress(event:any): void{
    this.mensaje_error = "";
  }

}
