import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  public avatar: string;
  public userActions: UserActions[];
  private transalteSubscription: Subscription;
  private userDataSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromJson();
    this.initializeUserDataFromStore();
  }


  private initializeUserDataFromJson() {
    this.transalteSubscription = this.translate.stream('user').subscribe((data: User) => {
      this.userActions = data.userLogoutChanges;
    })
  }

  private initializeUserDataFromStore() {
    this.userDataSubscription = this.store.pipe(select(selectUserData)).subscribe((data) => {
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
      this.router.navigate(['/login']).then();
    } else if (action === 'remove') {

      this.authService.deleteUser()
    }
  }

  ngOnDestroy(): void {
    this.transalteSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();
  }

}
