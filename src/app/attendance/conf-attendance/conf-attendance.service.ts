import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ConfAttendanceService {

  private URL = BASE_URL + '/api/quincena';

  constructor(private http: HttpClient) { }

  findAllQuincenas(): Observable<any> {
    return this.http.get<any>(this.URL + '/findAll');
  }

}
