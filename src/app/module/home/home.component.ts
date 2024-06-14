import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StoreInterface } from '../../store/model/store.model';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../store/selectors/store.selectors';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject, Subscription, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isMobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.initilizeWidthPage();
  }


  ngOnInit(): void {
    this.initilizeWidthPage()
   
  }

  private initilizeWidthPage() {
    if (innerWidth < 1124) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }



}
