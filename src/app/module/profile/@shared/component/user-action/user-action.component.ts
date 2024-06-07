import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserActions } from '../../services/profile.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../auth/@shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit, OnDestroy {

  public userActions: UserActions[];
  private transalteSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromJson();
  }

  private initializeUserDataFromJson() {
    this.transalteSubscription = this.translate.stream('user').subscribe((data: User) => {
      this.userActions = data.userLogoutChanges;
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

  }

}
