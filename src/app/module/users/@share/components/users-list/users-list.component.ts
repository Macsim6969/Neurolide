import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectAllUsers } from '../../../../../store/selectors/store.selectors';
import { HeaderInfo, MonitoringData } from '../../../../../shared/interfaces/header.interface';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  private mainData: any
  public monitoringData: MonitoringData = null;
  public headerData: HeaderInfo[];
  public transaction: any;
  public isUseCard: number = 789;
  public card;

  public allUsers;
  public isActiveId: number;
  public isSetting: boolean
  private translateSubscription: Subscription;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initializeMonitoringData();
    this.initializeHeaderDataFromJSON();
  }

  private initializeHeaderDataFromJSON() {
    this.translateSubscription = this.translate.stream('usersList').subscribe((data: HeaderInfo[]) => {
      this.headerData = data;
      this.updateHeaderData();
    })
  }

  private initializeMonitoringData() {
    this.store.pipe(select(selectAllUsers)).subscribe((data) => {
      this.allUsers = Object.values(data)
      this.mainData = data;

    })

  }

  private updateHeaderData() {
    if (this.headerData && this.monitoringData) {
      this.headerData = this.headerData.map(card => {
        return {
          ...card,
          data: Object.values(this.monitoringData)[0][card.title.toLowerCase()]
        };
      });
    }
  }

  public choiceCard(id: number) {
    this.isUseCard = id;
  }

  public openSettings(id: number) {
    this.isSetting = true;
    this.isActiveId = id;

    this.monitoringData = Object.values(this.mainData)[this.isActiveId]['monitoring'];
    this.transaction = Object.values(Object.values(this.mainData)[this.isActiveId]['historyTransactions'])[0];
    this.card = Object.values(Object.values(Object.values(this.mainData)[this.isActiveId]['card'])[0]);
    this.updateHeaderData();
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }
}
