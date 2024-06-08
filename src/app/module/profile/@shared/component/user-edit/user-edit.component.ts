import { User, UserActions, UserData } from '../../interfaces/profile.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectUserData } from '../../../../../store/selectors/store.selectors';
import { ProfileServices } from '../../services/profile.service';

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
    private store: Store<{ store: StoreInterface }>,
    private profileServices: ProfileServices
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
      if (Object.keys(data).length > 1) {
        this.updateHeaderData(data);
      } else {
        this.updateHeaderData(Object.values(data)[0]);
      }
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

  public openPopup(){
    this.profileServices._isPopup = true;
  }

  ngOnDestroy(): void {
    this.transalteSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();

  }
}
