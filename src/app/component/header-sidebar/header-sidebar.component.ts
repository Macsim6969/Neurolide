import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebarService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.scss']
})
export class HeaderSidebarComponent implements OnInit, OnDestroy {

  public isSidebar: boolean;
  private sidebarSubscription: Subscription;
  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.streamSidebarData();
  }

  private streamSidebarData() {
    this.sidebarSubscription = this.sidebarService._isSidebarMobile$.subscribe((data) => {
      this.isSidebar = data;
    })
  }
  public toogleSidebar() {
    this.sidebarService._isSidebarMobile = !this.isSidebar;
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }


}
