import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';
import { Personal } from 'src/app/models/personal';


@Injectable({
  providedIn: 'root'
})
export class PerfilEmpleadoService {

  private URL = BASE_URL + '/api/';

  constructor(private http: HttpClient) { }

  getFindByUser(usuario: string): Observable<any> {
    return this.http.get<any>(this.URL + 'usuarios/profile/' + usuario);
  }

  updateInfoUsuario(personal: Personal): Observable<any> {
    let data = JSON.stringify(personal);
    return this.http.post<any>(this.URL + 'personal/updateInfoUsuario', data);
  }

  uploadImagen(archivo: File, id_personal): Observable<HttpEvent<{}>> {
    
    let formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id_personal',id_personal);

    const req = new HttpRequest('POST', this.URL + 'usuarios/imageProfile/upload' , formData, {
      reportProgress: true
    });

    return this.http.request(req);
    
  }

}
