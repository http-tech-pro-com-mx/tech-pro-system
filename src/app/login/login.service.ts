import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  BASE_URL } from '../constants';
import {  Usuario } from '../models/usuario';



@Injectable()
export class LoginService {

  private URL = BASE_URL + '/oauth/token';
  
  
  constructor(private http: HttpClient) { }



  login(usuario: Usuario): Observable<any>{
    const credentiales = btoa('tech-pro-app' + ':' + 't3chPr02019');
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+ credentiales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.usuario);
    params.set('password', usuario.contrasenia);

    return this.http.post<any>(this.URL,params.toString(),{ headers: httpHeaders});
  }

}
