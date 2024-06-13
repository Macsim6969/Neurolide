import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebarService';
import { Subscription, combineLatest, filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SidebarData } from '../../shared/interfaces/sidebar.interface';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.scss']
})
export class HeaderSidebarComponent implements OnInit, OnDestroy {

  public activeTitle: SidebarData;
  public sidebarData: SidebarData[];
  public isSidebar: boolean;
  private sidebarSubscription: Subscription;
  private routerSubscription: Subscription;
  constructor(
    private sidebarService: SidebarService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.streamSidebarData();
    this.streamActiveRoute();
  }

  private streamSidebarData() {
    this.sidebarSubscription = combineLatest(([this.sidebarService._isSidebarMobile$, this.translate.stream('sidebar')])).subscribe(([isActive, allTitle]) => {
      this.isSidebar = isActive;
      this.sidebarData = allTitle;

    })
  }

  private streamActiveRoute() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (this.sidebarData) {
        this.activeTitle = this.sidebarData.find((e => e?.url === event['routerEvent']?.url))
      }
    });
  }

  public toogleSidebar() {
    this.sidebarService._isSidebarMobile = !this.isSidebar;
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
    this.routerSubscription ? this.routerSubscription.unsubscribe() : null;
  }


}
