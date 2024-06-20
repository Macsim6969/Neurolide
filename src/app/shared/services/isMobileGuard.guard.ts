import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class IsMobileGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rule = JSON.parse(localStorage.getItem('rules'))
    if (innerWidth < 1124) {
      return true;
    } else if (rule === 'manager') {
      return this.router.navigate(['/manager']);
    } else if (rule === 'brand') {
      return this.router.navigate(['/brand']);
    } else {
      return this.router.navigate(['/affiliate']);
    }
  }
}
