import { Injectable } from '@angular/core';
import { Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { CanActivate }            from '@angular/router';
import { AuthService }                   from '../shared';
@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
      if(this.auth.isAdmin()){
        return true;
      } else {
        this.router.navigate(['admin/unauthorized']);
        return false;
      }
    } 
  }
}