import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.auth.getToken();

        if(request.url.includes('oauth/token')){
            return next.handle(request.clone());
        }else if(request.url.includes('upload')){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }else if (token != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request);
       

    }
}