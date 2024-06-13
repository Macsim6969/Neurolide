import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectAllUsers, selectMonitoringData } from '../../../../../store/selectors/store.selectors';
import { HeaderInfo, MonitoringData } from '../../../../../shared/interfaces/header.interface';
import { Subscription, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ListIconsService } from '../../services/listIcon.service';
import { ChangeMonitoringDataService } from '../../services/changeMonitoringData.service';
import { UserService } from '../../services/user.service';
import { UserSearchService } from '../../services/userSearch.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  private textMonitoring: MonitoringData;
  public monitoringData: MonitoringData;
  public headerData: HeaderInfo[];

  public isConfirmAttention: boolean;
  public userInfo;
  public allUsers;
  public isActiveEmail: string;
  public isSetting: boolean;
  public isModeChange: number;
  public monitoringChanges: number;

  public removeId: string;
  public removeToken: string;

  private searchDataSubscription: Subscription;
  private translateSubscription: Subscription;
  private selectAllUsersSubscription: Subscription;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private translate: TranslateService,
    private listIconsService: ListIconsService,
    private changeMonitoringDataService: ChangeMonitoringDataService,
    private userSerice: UserService,
    private userSearchService: UserSearchService
  ) { }

  ngOnInit(): void {
    this.initializeMonitoringData();
    this.streamUserListData();
    this.streamSearchFilterData();
  }

  private streamUserListData() {
    this.translateSubscription = this.translate.stream('usersList').subscribe((data) => {
      this.textMonitoring = data;
    });
  }

  private streamSearchFilterData() {
    this.searchDataSubscription = this.userSearchService._searchData$.subscribe((selectedField) => {
      this.userInfo.sort((a, b) => {
        let fieldA = this.getFieldValue(a, selectedField);
        let fieldB = this.getFieldValue(b, selectedField);

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return fieldA.localeCompare(fieldB);
        } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return fieldA - fieldB;
        } else {

          return 0;
        }
      });
    });
  }

  private getFieldValue(user: any, field: string): any {
    switch (field) {
      case 'email':
        return user.profile?.email || '';
      case 'userID':
        return user.profile?.userID || '';
      case 'name':
        return user.profile?.name || '';
      case 'balance':
        return user.monitoring?.balance ? parseFloat(user.monitoring.balance) : 0;
      case 'transactions':
        return user.monitoring?.transactions ? user.monitoring.transactions.length : 0;
      case 'rules':
        return user.profile?.rules || ''; // Assuming rules is a string or other comparable type
      default:
        return null;
    }
  }



  private initializeMonitoringData() {
    this.selectAllUsersSubscription = this.store.select(selectAllUsers).subscribe((data) => {
      if (data && Object.values(data)) {
        this.allUsers = Object.values(data);
        this.userInfo = this.allUsers.reduce((acc, user) => {
          if (user.profile && user.monitoring && user.profile.rules !== 'manager') {
            if (user && user.profile && user.monitoring) {
              if (Object.keys(user.profile).length > 1) {
                acc.push({ profile: user.profile, monitoring: user.monitoring, transactions: user?.transactions, card: user?.card });
              } else {
                acc.push({ profile: Object.values(user.profile)[0], monitoring: Object.values(user.monitoring)[0], transactions: Object.values(user.transactions), card: Object.values(user.card), });
              }
            }
          }
          return acc;
        }, []);
      }
      this.allUsers ? this.setMonitoringDataOtherUser() : null;
    });
  }

  public openSettings(email: string) {
    this.isSetting = true;
    this.isActiveEmail = email;
    this.setMonitoringDataOtherUser();
  }

  private setMonitoringDataOtherUser() {
    if (this.allUsers) {
      const userData = this.allUsers.find(user => user.profile.email === this.isActiveEmail);
      if (userData) {
        this.monitoringData = userData.monitoring;
        if (typeof this.monitoringData === 'object') {
          if (Object.keys(this.monitoringData).length === 1) {
            this.updateHeaderData(this.textMonitoring, Object.values(this.monitoringData)[0]);
          } else {
            this.updateHeaderData(this.textMonitoring, this.monitoringData);
          }
        }
      }
    }

  }

  private updateHeaderData(text, content) {
    if (text && content) {
      const categories = Object.keys(content);
      this.headerData = text
        .filter(card => categories.includes(card.title.toLowerCase()))
        .map(card => ({
          ...card,
          data: content[card.title.toLowerCase()]
        }));

        console.log(this.headerData)
    }
  }

  public useEditeMode(i: number) {
    this.isModeChange = i
  }

  public saveMonitoringData(index: string, id: string) {
    this.changeMonitoringDataService.updateMonitoringData(index, this.monitoringChanges, this.monitoringData, id);
    this.isModeChange = null;
  }

  public removeUser(id: string, token: string) {
    this.isConfirmAttention = true
    this.removeId = id;
    this.removeToken = token;
  }

  public confirme() {
    this.removeUser(this.removeId, this.removeToken)
    this.isConfirmAttention = false;
  }
  public openPopupUser(email: string) {
    const user = this.userInfo.find(e => e.profile.email === email)
    this.userSerice._isUser = user;
    this.userSerice._isUserPopup = true;
  }

  public openTransitionPopup(email: string, idNomer: string, id: number, userId: string) {
    const user = this.userInfo.find(e => e.profile.email === email)
    this.userSerice._transitionData = user.transactions;
    this.userSerice._isTransitionPopup = true;
    this.userSerice._activeTransition = idNomer;
    this.userSerice._activeTransitionId = id;
    this.userSerice._userId = userId;
  }


  ngOnDestroy(): void {
    this.searchDataSubscription.unsubscribe();
    this.translateSubscription.unsubscribe();
    this.selectAllUsersSubscription.unsubscribe();
  }
}
