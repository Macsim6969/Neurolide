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
    return this.store.pipe(
      select(selectUserData),
      take(1),
      map((data) => {
        console.log('User data:', data);
        const currentUrl = state.url;
        if (data.rules === 'brand' && currentUrl !== '/brand') {
          return this.router.createUrlTree(['/brand']);
        } else if (data.rules === 'manager' && currentUrl !== '/manager') {
          return this.router.createUrlTree(['/manager']);
        } else if (data.rules === 'affiliate' && currentUrl !== '/affiliate') {
          return this.router.createUrlTree(['/affiliate']);
        } else if (!data.rules || ['brand', 'manager', 'affiliate'].indexOf(data.rules) === -1) {
          return this.router.createUrlTree(['/']);
        }
        return true; 
      })
    );
  }
}
