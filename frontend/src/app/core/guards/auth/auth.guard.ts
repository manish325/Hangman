import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url;
    const token = this.authService.getToken();
    const currentRole = this.authService.getCurrentRole();

    if(url.includes('auth')) {
      switch(url) {
        case '/auth' : 
          if(!token && !currentRole)
          return true;
          else if(token && !currentRole) {
            this.router.navigate(['auth/choose-role'])
            return false;
          } else if(token && currentRole) {
            this.router.navigate([this.authService.getCurrentRole()]);
            return false;
          }
        break;
        case '/auth/choose-role' : 
        if(token && !currentRole)
        return true;
        else 
        this.router.navigate(['auth']);
        return false;
        break;
      }
    } else {
      if(token && currentRole) {
        if(url.includes('admin')) {
          return this.authService.getUserDetails()?.roles.includes('ADMIN') ? true : false;
        } else  if(url.includes('player')) {
          return this.authService.getUserDetails()?.roles.includes('PLAYER') ? true : false;
        } 
      } else {
        this.router.navigate(['auth'])
        return false;
      }
    } 
    return true;
    
  }

}
