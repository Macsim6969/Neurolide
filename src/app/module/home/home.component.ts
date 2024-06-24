import { Component, OnDestroy, OnInit } from '@angular/core';
import { IsMobilePage } from '../../shared/abstract/mobilePage/mobilePage';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends IsMobilePage implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private router: Router
  ) {
    super();
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.streamRouterUrl();
  }

  private streamRouterUrl() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.saveCurrentRoute(event.urlAfterRedirects);
      }
    });
  }

  private saveCurrentRoute(route: string) {
    localStorage.setItem('currentRoute', route);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
