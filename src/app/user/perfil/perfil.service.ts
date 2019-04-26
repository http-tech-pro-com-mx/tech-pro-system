import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private URL = BASE_URL + '/api/usuarios';

  constructor(private http: HttpClient) { }

  getFindByUser(usuario: string): Observable<any> {
    return this.http.get<any>(this.URL + '/profile/' + usuario);
  }


  changePassword(contrasenias: any): Observable<any> {
    let params = JSON.stringify(contrasenias);
    return this.http.post<any>(this.URL + '/changePassword', params);
  }

  uploadImagen(archivo: File, id:number): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id', ""+id);

    const req = new HttpRequest('POST', this.URL + '/imageProfile/upload' , formData, {
      reportProgress: true
    });

    return this.http.request(req);
    
  }

}
