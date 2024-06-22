import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, combineLatest, takeUntil } from 'rxjs';
import { User, UserActions } from '../../interfaces/profile.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../auth/@shared/services/auth.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectUserData } from '../../../../../store/selectors/store.selectors';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public rules: 'manager' | 'brand' | 'affiliate';
  public url: string;
  public avatar: string;
  public userActions: UserActions[];

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromJson();
    this.rules = JSON.parse(localStorage.getItem('rules'));
    this.url = localStorage.getItem('currentRoute');
  }

  private initializeUserDataFromJson() {
    combineLatest(([this.translate.stream('user'), this.store.pipe(select(selectUserData))])).pipe(takeUntil(this.destroy$)).subscribe(([dataActions, data]) => {
      this.userActions = dataActions.userLogoutChanges;
      if (data) {
        if (Object.keys(data).length > 1) {
          this.avatar = data.avatar;
        } else {
          this.avatar = Object.values(data)[0].avatar
        }
      }
    })
  }



  public actionsLogout(action: string) {
    if (action === 'logout') {
      this.authService.logout();
      this.router.navigate(['/auth/login']).then();
    } else if (action === 'remove') {

      this.authService.deleteUser()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
