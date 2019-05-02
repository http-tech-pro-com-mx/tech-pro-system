import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class RptAttendanceService {

  private URL = BASE_URL + '/api/quincena';

  constructor(private http: HttpClient) { }

  findAllAnioAndMonth(): Observable<any> {
    return this.http.get<any>(this.URL + '/findAllAnioAndMonth');
  }

  consultaRegistroQuincena(params:any, userid: number): Observable<any> {
    params.userid = userid;
    return this.http.post<any>(this.URL+'/reporteEntradaSalida',JSON.stringify(params));
  }


}
