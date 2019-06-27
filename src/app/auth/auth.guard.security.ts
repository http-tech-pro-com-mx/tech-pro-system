import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardSecurity implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedRole;
    
        let roles_usuario= this.auth.getRoles();
    
        if(roles_usuario.indexOf(expectedRole) == -1){
            this.router.navigate(['home']);
            return false;
        }
        return true;
       
       
    }
}