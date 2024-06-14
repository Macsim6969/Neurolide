import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListIconsService } from '../../services/listIcon.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectAllUsers } from '../../../../../store/selectors/store.selectors';
import { HeaderInfo, MonitoringData } from '../../../../../shared/interfaces/header.interface';
import { TranslateService } from '@ngx-translate/core';
import { ChangeMonitoringDataService } from '../../services/changeMonitoringData.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-mobile',
  templateUrl: './user-mobile.component.html',
  styleUrls: ['./user-mobile.component.scss']
})
export class UserMobileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public userInfo;
  public isConfirmAttention: boolean;
  public removeId: string;
  public removeToken: string;
  public allUsers;
  public isActiveEmail: string;
  public headerData: HeaderInfo[];
  private textMonitoring: MonitoringData;
  public monitoringData: MonitoringData;
  public isActiveSlide: number = 0;
  public isOpen: boolean;
  public isModeChange: number;
  public monitoringChanges: number;
  public isOpenPayments: number;

  constructor(
    private listIconsService: ListIconsService,
    private store: Store<{ store: StoreInterface }>,
    private translate: TranslateService,
    private changeMonitoringDataService: ChangeMonitoringDataService,
    private userSerice: UserService
  ) { }

  ngOnInit(): void {
    this.streamUserListData();
    this.initializeMonitoringData();
  }

  private streamUserListData() {
    this.translate.stream('usersList').pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.textMonitoring = data;
    });
  }

  private initializeMonitoringData() {
    this.store.select(selectAllUsers).pipe(takeUntil(this.destroy$)).subscribe((data) => {
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
      console.log(this.userInfo)
      this.userInfo ? this.setMonitoringDataOtherUser() : null;
    });
  }

  private setMonitoringDataOtherUser() {
    if (this.allUsers) {
      const userData = this.allUsers.find(user => user.profile.email === this.isActiveEmail);
      if (userData) {
        this.monitoringData = userData.monitoring;
        console.log(this.monitoringData, '342324')
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

  public openCard(email: string) {
    this.isOpen = !this.isOpen;
    this.isActiveEmail = email;
    this.setMonitoringDataOtherUser();
  }

  public openTransitionPopup(email: string, idNomer: string, id: number, userId: string) {
    const user = this.userInfo.find(e => e.profile.email === email)
    this.userSerice._transitionData = user.transactions;
    this.userSerice._isTransitionPopup = true;
    this.userSerice._activeTransition = idNomer;
    this.userSerice._activeTransitionId = id;
    this.userSerice._userId = userId;
  }

  public checkPayments(index: number) {
    this.isOpenPayments = index;
  }

  public removeUser(id: string, token: string) {
    this.isConfirmAttention = true
    this.removeId = id;
    this.removeToken = token;
  }

  public removeTransition(email: string, idUser: string, id: string) {
    const user = this.userInfo.find(e => e.profile.email == email);
    const newTransactions = user.transactions.filter(t => t.nomer !== id)
    this.userSerice.removeTransactions(newTransactions, idUser);
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

  public left() {
    if (this.isActiveSlide === 0) {
      return
    } else {
      this.isActiveSlide--;
    }
    this.isOpen = false;
  }

  public right() {
    if (this.isActiveSlide === this.userInfo.lenght - 1) {
      return
    } else {
      this.isActiveSlide++;
    }
    this.isOpen = false;
  }

  public useEditeMode(i: number) {
    this.isModeChange = i
  }

  public saveMonitoringData(index: string, id: string) {
    this.changeMonitoringDataService.updateMonitoringData(index, this.monitoringChanges, this.monitoringData, id);
    this.isModeChange = null;
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
