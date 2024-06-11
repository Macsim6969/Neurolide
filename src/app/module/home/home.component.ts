import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StoreInterface } from '../../store/model/store.model';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../store/selectors/store.selectors';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    this.initializeUserData();
  }

  private initilizeWidthPage() {
    if (innerWidth < 1024) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  private initializeUserData() {
    this.storeSubscription = this.store.select(selectUserData).subscribe((data) => {
      if (data) {
        this.router.navigate([`/${data.rules}`]).then()
      }
    })
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

}
