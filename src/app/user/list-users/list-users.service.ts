import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';

@Injectable({
    providedIn: 'root'
})

export class ListUsersService {

    private URL = BASE_URL + '/api/usuarios';
    

    constructor(private http: HttpClient) { }

    getAllEmpleados(): Observable<any> {
        return this.http.get<any>(this.URL + '/findAll');
    }

}