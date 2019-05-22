import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants'
;
@Injectable({
  providedIn: 'root'
})
export class FormJustificationService {

  private URL = BASE_URL + '/api/';

  constructor(private http: HttpClient) { }

  getDayHabiles(): Observable<any> {
    return this.http.get<any>(this.URL + 'dia_habil/findAll');
  }
  
}
