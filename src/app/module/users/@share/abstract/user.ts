import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";
import { HeaderInfo, MonitoringData } from "../../../../shared/interfaces/header.interface";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../../../store/model/store.model";
import { selectAllUsers } from "../../../../store/selectors/store.selectors";
import { ChangeMonitoringDataService } from "../services/changeMonitoringData.service";
import { UserService } from "../services/user.service";
import { ListIconsService } from "../services/listIcon.service";
import { GlobalIconsService } from "../../../../shared/services/globalIcon.service";



@Component({
  template: ''
})

export abstract class UserClass implements OnInit, OnDestroy{
  protected destroy$ = new Subject<void>();
  private textMonitoring: MonitoringData;
  public userInfo;
  public allUsers;
  public isModeChange: number;
  public isActiveEmail: string;
  public monitoringData: MonitoringData;
  public headerData: HeaderInfo[];
  public isConfirmAttention: boolean;
  public removeId: string;
  public removeToken: string;
  public monitoringChanges: number;
  constructor(
    protected store: Store<{ store: StoreInterface }>,
    protected translate: TranslateService,
    protected changeMonitoringDataService: ChangeMonitoringDataService,
    protected userSerice: UserService, 
    protected globalIconsService: GlobalIconsService,
    protected listIconsService: ListIconsService,
  ){}

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
      this.allUsers ? this.setMonitoringDataOtherUser() : null;
    });
  }

  protected setMonitoringDataOtherUser() {
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

  public removeTransition(email: string, idUser: string, id: string) {
    const user = this.userInfo.find(e => e.profile.email == email);
    const newTransactions = user.transactions.filter(t => t.nomer !== id)
    this.userSerice.removeTransactions(newTransactions, idUser);
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}