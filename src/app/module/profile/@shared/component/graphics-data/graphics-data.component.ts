import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreInterface } from '../../../../../store/model/store.model';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectMonitoringData } from '../../../../../store/selectors/store.selectors';
import { MonitoringData } from '../../../../../shared/interfaces/header.interface';

@Component({
  selector: 'app-graphics-data',
  templateUrl: './graphics-data.component.html',
  styleUrls: ['./graphics-data.component.scss']
})
export class GraphicsDataComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public graphicsData: { key: string, value: number }[];
  public rulse: string;
  constructor(
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.rulse = JSON.parse(localStorage.getItem('rules'));
    this.initializeMonitoringDataFromStore();
  }

  private initializeMonitoringDataFromStore() {
    this.store.pipe(select(selectMonitoringData)).pipe(takeUntil(this.destroy$)).subscribe((data: MonitoringData) => {
      if (data && this.rulse === 'manager') {
        this.grapicsManager(data);
      } else if (data && this.rulse === 'brand') {
        this.grapicsBrand(data);
      } else {
        this.grapicsAffiliate(data);
      }
    });
  }

  private grapicsManager(data: MonitoringData) {
    this.graphicsData = [
      { key: 'index', value: Object.values(data)[0].index ?? 0 },
      { key: 'enrollment', value: Object.values(data)[0].enrollment ?? 0 },
      { key: 'budget', value: Object.values(data)[0].budget ?? 0 },
      { key: 'advice', value: Object.values(data)[0].advice ?? 0 }
    ];
  }

  private grapicsBrand(data: MonitoringData) {
    this.graphicsData = [
      { key: 'leads', value: Object.values(data)[0].leads ?? 0 },
      { key: 'disregard', value: Object.values(data)[0].disregard ?? 0 },
      { key: 'approve', value: Object.values(data)[0].approve ?? 0 },
      { key: 'advice', value: Object.values(data)[0].advice ?? 0 }
    ];
  }

  private grapicsAffiliate(data: MonitoringData) {
    this.graphicsData = [
      { key: 'index', value: Object.values(data)[0].index ?? 0 },
      { key: 'enrollment', value: Object.values(data)[0].enrollment ?? 0 },
      { key: 'budget', value: Object.values(data)[0].budget ?? 0 },
      { key: 'advice', value: Object.values(data)[0].advice ?? 0 }
    ];
  }

  public getWidth(value: number): number {
    if (value) {
      const maxValue = Math.max(...this.graphicsData.map(item => item.value));
      const width = maxValue ? (value / maxValue) * 100 : 0;
      return width;
    } else {

      return 0;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
