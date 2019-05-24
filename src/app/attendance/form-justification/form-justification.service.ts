import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants'
;
import { Justificacion } from 'src/app/models/justificacion';
@Injectable({
  providedIn: 'root'
})
export class FormJustificationService {

  private URL = BASE_URL + '/api/';

  constructor(private http: HttpClient) { }

  createJustificacion(justificacion: Justificacion): Observable<any> {
    // let params:any = {
    //   quincena: quincena,
    //   dias_habiles: dias_habiles
    // };
    return this.http.post<any>(this.URL + 'justificacion/crear',justificacion);
  }

  
}
