import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HeaderInfo, MonitoringData } from '../../shared/interfaces/header.interface';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectMonitoringData } from '../../store/selectors/store.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public monitoringData: MonitoringData = null;
  public headerData: HeaderInfo[] = null;
  private translateSubscription: Subscription;
  private selectMonitoringSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.initializeMonitoringData();
    this.initializeHeaderDataFromJSON();
  }

  private initializeHeaderDataFromJSON() {
    this.translateSubscription = this.translate.stream('headerInfo').subscribe((data: HeaderInfo[]) => {
      this.headerData = data;
      this.updateHeaderData();
    })
  }

  private initializeMonitoringData() {
    this.selectMonitoringSubscription = this.store.pipe(select(selectMonitoringData)).subscribe((monitoring: MonitoringData) => {
      monitoring ? this.monitoringData = Object.values(monitoring)[0] : null;
      this.updateHeaderData();
    })
  }

  private updateHeaderData() {
    if (this.headerData && this.monitoringData) {
      this.headerData = this.headerData.map(card => {
        return {
          ...card,
          data: this.monitoringData[card.title.toLowerCase()]
        };
      });
    }
  }

  ngOnDestroy(): void {
    this.selectMonitoringSubscription.unsubscribe();
    this.translateSubscription.unsubscribe();

  }
}
