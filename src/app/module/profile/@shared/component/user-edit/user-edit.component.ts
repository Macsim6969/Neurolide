import { User, UserActions, UserData } from './../../services/profile.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectUserData } from '../../../../../store/selectors/store.selectors';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  public userInfo: UserData[];
  public userActions: UserActions[];
  private transalteSubscription: Subscription;
  private userDataSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromStore();
    this.initializeUserDataFromJson();
  }

  private initializeUserDataFromJson() {
    this.transalteSubscription = this.translate.stream('user').subscribe((data: User) => {
      this.userActions = data.userActions;
      this.userInfo = data.userInfo;
    })
  }

  private initializeUserDataFromStore() {
    this.userDataSubscription = this.store.pipe(select(selectUserData)).subscribe((data) => {
      data ? this.updateHeaderData(Object.values(data)[0]) : null;
    })
  }

  private updateHeaderData(data: any) {
    if (this.userInfo && data) {
      this.userInfo = this.userInfo.map(card => {
        const key = card.key;
        const value = key === 'password' ? '*'.repeat(data[key]?.length) : data[key] || '';
        return {
          ...card,
          data: value
        };
      });
    }
  }

  ngOnDestroy(): void {
    this.transalteSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();

  }
}
