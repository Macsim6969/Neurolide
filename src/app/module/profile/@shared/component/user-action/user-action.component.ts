import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserActions } from '../../services/profile.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit, OnDestroy {

  public userActions: UserActions[];
  private transalteSubscription: Subscription;
  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromJson();
  }

  private initializeUserDataFromJson() {
    this.transalteSubscription = this.translate.stream('user').subscribe((data: User) => {
      this.userActions = data.userLogoutChanges;
    })
  }


  ngOnDestroy(): void {
    this.transalteSubscription.unsubscribe();

  }

}
