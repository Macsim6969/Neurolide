import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SidebarData } from '../../shared/interfaces/sidebar.interface';
import { Store, select } from '@ngrx/store';
import { StoreInterface } from '../../store/model/store.model';
import { selectUserData } from '../../store/selectors/store.selectors';
import { UserData } from '../../shared/interfaces/backend.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public userRule: string;
  public sidebarData: SidebarData[];
  private translateSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.initialeUserRules();
    this.initializeSidebarDataFromJSON()
  }

  private initializeSidebarDataFromJSON() {
    this.translateSubscription = this.translate.stream('sidebar').subscribe((data: SidebarData[]) => {
      this.sidebarData = data;
    })
  }

  private initialeUserRules() {
    this.store.pipe(select(selectUserData)).subscribe((data: UserData) => {
      data ? this.userRule = data.rules : null
    })
  }

  ngOnDestroy(): void {

    this.translateSubscription.unsubscribe();
  }
}
