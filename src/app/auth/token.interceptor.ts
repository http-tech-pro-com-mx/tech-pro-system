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

        if (token != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                    //'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
        return next.handle(request);
       

    }
}