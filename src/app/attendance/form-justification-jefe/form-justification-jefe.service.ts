import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';
import { Justificacion } from 'src/app/models/justificacion';

@Injectable({
  providedIn: 'root'
})
export class FormJustificationJefeService {

  private URL = BASE_URL + '/api/';

  constructor(private http: HttpClient) { }

  findEmpleados(): Observable<any> {
    return this.http.get<any>(this.URL + 'justificacion/findEmpleados');
  }

  createJustificacion(justificacion: Justificacion, empleados: Array<any>): Observable<any> {
    return this.http.post<any>(this.URL + 'justificacion/justificar-empleados',JSON.stringify({justificacion:justificacion, empleados: empleados}));
  }
  
}
