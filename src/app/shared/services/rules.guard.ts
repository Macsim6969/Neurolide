import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';
import { StoreInterface } from './../../store/model/store.model';
import { selectUserData } from '../../store/selectors/store.selectors';

@Injectable()
export class RulesGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<{ store: StoreInterface }>
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userData = localStorage.getItem('userData');
    const rules = JSON.parse(localStorage.getItem('rules'))
    if (userData && rules) {
      return true;
    } else {
      return this.router.navigate(['/register']).then();
    }
  }
}
