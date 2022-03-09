import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrantAccessToTabsGuard implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth, private router: Router
   ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if there is no authentication through login then take user back to the login page
      // return false so the route isnt executed, if it is continue to the tabs page
      return this.angularFireAuth.authState.pipe(map((auth)=> {
        if(!auth){
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }));
}
}
