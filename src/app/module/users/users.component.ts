import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './@share/services/user.service';
import { Subject, Subscription, combineLatest, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public isMobile: boolean;
  public isUserPopup: boolean;
  public isTransitionPopup: boolean;
  constructor(
    private userService: UserService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.initializeIsMobilePage();
  }

  ngOnInit(): void {
    this.initializeIsMobilePage();
    this.initializeUserPopupDataAndTransitionData();

  }

  private initializeIsMobilePage() {
    if (innerWidth < 1124) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  private initializeUserPopupDataAndTransitionData() {
    combineLatest(([this.userService._isUserPopup$, this.userService._isTransitionPopup$])).pipe(takeUntil(this.destroy$)).subscribe(([userData, transitionData]) =>{
      this.isUserPopup = userData;
      this.isTransitionPopup = transitionData;
    })
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
