import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userData')) {
      const rules = JSON.parse(localStorage.getItem('rules'))
      if (rules === 'manager') {
        return this.router.createUrlTree(['/manager']);
      } else if (rules === 'brand') {
        return this.router.createUrlTree(['/brand']);
      } else if (rules === 'affiliate') {
        return this.router.createUrlTree(['/affiliate']);
      } else {
        return false
      }
    } else {
      return this.router.createUrlTree(['/register']);
    }
  }
}
