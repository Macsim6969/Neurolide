import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './@share/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public isMobile: boolean;
  public isUserPopup: boolean;
  public isTransitionPopup: boolean;
  private isTransitionPopupSubscription: Subscription;
  private isUserPopupSubscription: Subscription;
  constructor(
    private userService: UserService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.initializeIsMobilePage();
  }

  ngOnInit(): void {
    this.initializeIsMobilePage();
    this.initializeUserPopupData();
    this.initializeTransitionPopupData();
  }

  private initializeIsMobilePage() {
    if (innerWidth < 1124) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  private initializeUserPopupData() {
    this.isUserPopupSubscription = this.userService._isUserPopup$.subscribe((data: boolean) => {
      this.isUserPopup = data
    })
  }

  private initializeTransitionPopupData() {
    this.isTransitionPopupSubscription = this.userService._isTransitionPopup$.subscribe((data: boolean) => {
      this.isTransitionPopup = data
    })
  }

  ngOnDestroy(): void {
    this.isUserPopupSubscription.unsubscribe();
    this.isTransitionPopupSubscription.unsubscribe();
  }
}
