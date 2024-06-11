import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class CanActiveGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rules = JSON.parse(localStorage.getItem('rules'))
    console.log(rules)
    if (rules === 'brand') {
      return this.router.navigate(['/brand']).then();
    } else if (rules === 'affiliate') {
      return this.router.navigate(['/affiliate']).then();
    } else {
      return this.router.navigate(['/manager']).then();
    }
  }
}
