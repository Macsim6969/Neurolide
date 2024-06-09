import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (JSON.parse(localStorage.getItem('rules')) === 'manager') {
      return true;
    } else if (JSON.parse(localStorage.getItem('rules')) === 'brand') {
      return this.router.createUrlTree(['/brand']);
    } else if (JSON.parse(localStorage.getItem('rules')) === 'affiliate') {
      return this.router.createUrlTree(['/affiliate']);
    } else {
      return false
    }
  }
}
