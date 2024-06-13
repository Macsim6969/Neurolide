import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StoreInterface } from '../../store/model/store.model';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../store/selectors/store.selectors';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public isMobile: boolean;
  private storeSubscription: Subscription;
  constructor(
    private store: Store<{ store: StoreInterface }>,
    private router: Router
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.initilizeWidthPage();
  }


  ngOnInit(): void {
    this.initilizeWidthPage()
    this.streamActiveRoute();
  }

  private initilizeWidthPage() {
    if (innerWidth < 1124) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  private streamActiveRoute() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log(event.url);
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

}
