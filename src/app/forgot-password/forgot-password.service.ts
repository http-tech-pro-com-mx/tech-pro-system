import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private URL = BASE_URL + '/api/usuarios/forgot-password-user';
  
  
  constructor(private http: HttpClient) { }

  recoveryPwd(correo_electronico: string): Observable<any>{
    const credentiales = btoa('tech-pro-app' + ':' + 't3chPr02019');
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Basic '+ credentiales
    });

    return this.http.post<any>(this.URL,correo_electronico,{ headers: httpHeaders});
  }


}
