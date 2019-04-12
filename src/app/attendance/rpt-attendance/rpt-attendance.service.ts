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

  consultaRegistroQuincena(params:any): Observable<any> {
    let params_search = new URLSearchParams();
    params_search.set('anio',params.anio);
    params_search.set('mes',params.mes);
    params_search.set('quincena',params.quincena);
    return this.http.post<any>(this.URL,params_search.toString());
  }


}
