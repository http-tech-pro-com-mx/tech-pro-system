import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class RptJustificationService {

  private URL = BASE_URL + '/api/';

  constructor(private http: HttpClient) { }

  findAllJustificaciones(): Observable<any> {
    return this.http.get<any>(this.URL + 'justificacion/findAllJustificaciones');
  }

  autorizar(id_jutificacion:number, estatus:number): Observable<any> {
    return this.http.post<any>(this.URL+'justificacion/autorizar',{id_justificacion: id_jutificacion, estatus: estatus });
  }

}
