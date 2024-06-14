import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebarService';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SidebarData } from '../../shared/interfaces/sidebar.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.scss']
})
export class HeaderSidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public activeTitle: SidebarData;
  public sidebarData: SidebarData[];
  public isSidebar: boolean;
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
    combineLatest(([this.sidebarService._isSidebarMobile$, this.translate.stream('sidebar')])).pipe(takeUntil(this.destroy$)).subscribe(([isActive, allTitle]) => {
      this.isSidebar = isActive;
      this.sidebarData = allTitle;

    })
  }

  private streamActiveRoute() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (this.sidebarData) {
        this.activeTitle = this.sidebarData.find((e => e?.url === event['routerEvent']?.url))
      }
    });
  }

  public toogleSidebar() {
    this.sidebarService._isSidebarMobile = !this.isSidebar;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
