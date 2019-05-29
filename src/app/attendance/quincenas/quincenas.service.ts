import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';
import { Quincena } from 'src/app/models/quincena';
import { Diah } from 'src/app/models/diah';

@Injectable({
  providedIn: 'root'
})
export class QuincenasService {

  private URL = BASE_URL + '/api/';

  constructor(private http: HttpClient) { }

  findAllQuincenas(): Observable<any> {
    return this.http.get<any>(this.URL + 'quincena/findAll');
  }

  getFindDayByIdQuincena(id_quincena: number): Observable<any> {
    return this.http.get<any>(this.URL + 'dia_habil/findDayByIdQuincena/' + id_quincena);
  }

  createQuincena(quincena: Quincena, dias_habiles: Array<Diah>): Observable<any> {
    let params:any = {
      quincena: quincena,
      dias_habiles: dias_habiles
    };
    return this.http.post<any>(this.URL + 'quincena/create-quincena',JSON.stringify(params));
  }

  updateQuincena(quincena: Quincena, dias_habiles: Array<Diah>): Observable<any> {
    let params:any = {
      quincena: quincena,
      dias_habiles: dias_habiles
    };
    return this.http.post<any>(this.URL + 'quincena/update-quincena',JSON.stringify(params));
  }

}
