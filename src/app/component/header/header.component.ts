import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, combineLatest, combineLatestAll } from 'rxjs';
import { HeaderInfo, MonitoringData } from '../../shared/interfaces/header.interface';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectMonitoringData, selectUserData } from '../../store/selectors/store.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public monitoringData: MonitoringData = null;
  public headerData: HeaderInfo[] = null;
  private combineSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.combineSubscription = combineLatest(([this.translate.stream('headerInfo'), this.store.pipe(select(selectMonitoringData))])).subscribe(([text, content]) => {
      if (text && content) {
  
        if (Object.keys(content).length > 1) {
          this.updateHeaderData(text, content)
        } else {
          this.updateHeaderData(text, Object.values(content)[0])
        } 
      }
    })
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

  ngOnDestroy(): void {
    this.combineSubscription.unsubscribe();
  }
}
