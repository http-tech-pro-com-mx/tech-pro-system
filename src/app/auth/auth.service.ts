import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode  from 'jwt-decode';

@Injectable()
export class AuthService {

  private helper = new JwtHelperService();

  public getToken(): string {
    return localStorage.getItem('bio2019t3chPr0');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return !this.helper.isTokenExpired(token);
    
  }

  public getIdPersonal(): number{
     return jwt_decode(this.getToken()).id_personal || -1; 
  }

  public getUserName(): string{
    return jwt_decode(this.getToken()).user_name || "NOT_USER"; 
 }

}