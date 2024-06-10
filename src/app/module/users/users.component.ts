import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './@share/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public isUserPopup: boolean;
  private isUserPopupSubscription: Subscription;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initializePopupData();
  }

  private initializePopupData() {
    this.isUserPopupSubscription = this.userService._isUserPopup$.subscribe((data: boolean) => {
      this.isUserPopup = data
    })
  }

  ngOnDestroy(): void {
    this.isUserPopupSubscription.unsubscribe();
  }
}
