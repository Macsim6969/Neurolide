import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectAllUsers, selectMonitoringData } from '../../../../../store/selectors/store.selectors';
import { HeaderInfo, MonitoringData } from '../../../../../shared/interfaces/header.interface';
import { Subscription, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ListIconsService } from '../../services/listIcon.service';
import { ChangeMonitoringDataService } from '../../services/changeMonitoringData.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  private mainData: any
  private textMonitoring: MonitoringData;
  public monitoringData: MonitoringData;
  public headerData: HeaderInfo[];
  public transaction: any;

  public userInfo;
  public allUsers;
  public isActiveEmail: string;
  public isSetting: boolean;
  public isModeChange: number;
  public monitoringChanges: number;
  private translateSubscription: Subscription;
  private selectAllUsersSubscription: Subscription;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private translate: TranslateService,
    private listIconsService: ListIconsService,
    private changeMonitoringDataService: ChangeMonitoringDataService
  ) { }

  ngOnInit(): void {
    this.initializeMonitoringData();
    this.translateSubscription = this.translate.stream('usersList').subscribe((data) => {
      this.textMonitoring = data;
    })
  }


  private initializeMonitoringData() {
    this.selectAllUsersSubscription = this.store.select(selectAllUsers).subscribe((data) => {
      this.mainData = data;
      if (data) {
        this.allUsers = Object.values(data);
        this.userInfo = this.allUsers.reduce((acc, user) => {
          if (user.profile && user.monitoring && user.profile.rules !== 'manager') {
            if (user.profile && user.monitoring) {
              if (Object.keys(user.profile).length > 1) {
                acc.push({ profile: user.profile, monitoring: user.monitoring, card: Object.values(user.card), transactions: Object.values(user.transactions) });
              } else {
                acc.push({ profile: Object.values(user.profile)[0], monitoring: Object.values(user.monitoring)[0], card: Object.values(user.card), transactions: Object.values(user.transactions) });
              }
            }
          }
          return acc;
        }, []);
      }
      this.allUsers ? this.setMonitoringDataOtherUser() : null;

      console.log(this.userInfo)
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
    }
  }

  public useEditeMode(i: number) {
    this.isModeChange = i
  }

  public saveMonitoringData(index: string, id: string) {
    this.changeMonitoringDataService.updateMonitoringData(index, this.monitoringChanges, this.monitoringData, id);
    this.isModeChange = null;
  }

  public setNewCard(id: string) {
    this.changeMonitoringDataService.setNewUserCard(id)
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
    this.selectAllUsersSubscription.unsubscribe();
  }
}
