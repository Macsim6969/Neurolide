import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectAllUsers, selectMonitoringData } from '../../../../../store/selectors/store.selectors';
import { HeaderInfo, MonitoringData } from '../../../../../shared/interfaces/header.interface';
import { Subscription, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  private mainData: any
  private textMonitoring: MonitoringData;
  public monitoringData: MonitoringData = null;
  public headerData: HeaderInfo[];
  public transaction: any;
  public isUseCard: number = 789;
  public card;

  public userInfo;
  public allUsers;
  public isActiveId: number;
  public isSetting: boolean
  private translateSubscription: Subscription;
  private selectAllUsersSubscription: Subscription;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initializeMonitoringData();
    this.translateSubscription = this.translate.stream('usersList').subscribe((data) => {
      this.textMonitoring = data;
    })
  }



  private initializeMonitoringData() {
    this.selectAllUsersSubscription = this.store.pipe(select(selectAllUsers)).subscribe((data) => {
      this.mainData = data;
      if (data) {
        this.allUsers = Object.values(data);
        this.userInfo = this.allUsers.reduce((acc, user) => {
          if (user.profile && user.monitoring && user.profile.rules !== 'manager') {
            if (user.profile && user.monitoring) {
              if (Object.keys(user.profile).length > 1) {
                acc.push({ profile: user.profile, monitoring: user.monitoring });
              } else {
                acc.push({ profile: Object.values(user.profile)[0], monitoring: Object.values(user.monitoring)[0] });
              }

            }
          }
          return acc;
        }, []);
      }
    });

  }

  public openSettings(id: number) {
    this.isSetting = true;
    this.isActiveId = id;


    this.monitoringData = Object.values(this.mainData)[this.isActiveId]['monitoring'];
    if (Object.keys(this.monitoringData).length === 1) {
      this.updateHeaderData(this.textMonitoring, Object.values(this.monitoringData)[0]);
    } else {
      this.updateHeaderData(this.textMonitoring, this.monitoringData);
    }

    // this.card = Object.values(Object.values(Object.values(this.mainData)[this.isActiveId]['card'])[0]);
    // this.transaction = Object.values(Object.values(this.mainData)[this.isActiveId]['historyTransactions'])[0];
  }

  private updateHeaderData(text, content) {
    if (text && content) {
      const categories = Object.keys(content);

      this.headerData = text.filter(card => categories.includes(card.title.toLowerCase()))
        .map(card => ({
          ...card,
          data: content[card.title.toLowerCase()]
        }));  
    }
  }

  public choiceCard(id: number) {
    this.isUseCard = id;
  }



  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
    this.selectAllUsersSubscription.unsubscribe();
  }
}
