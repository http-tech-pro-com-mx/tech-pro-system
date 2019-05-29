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

  findAllAnioAndMonthAndEmpleado(): Observable<any> {
    return this.http.get<any>(this.URL + 'quincena/findAllAnioAndMonthAndEmpleado');
  }

}
