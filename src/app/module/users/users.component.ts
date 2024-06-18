import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './@share/services/user.service';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { IsMobilePage } from '../../shared/abstract/mobilePage/mobilePage';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends IsMobilePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public isUserPopup: boolean;
  public isTransitionPopup: boolean;

  constructor(
    private userService: UserService
  ) {
    super()
  }

  override ngOnInit(): void {
    super.ngOnInit()
    this.initializeUserPopupDataAndTransitionData();

  }

  private initializeUserPopupDataAndTransitionData() {
    combineLatest(([this.userService._isUserPopup$, this.userService._isTransitionPopup$])).pipe(takeUntil(this.destroy$)).subscribe(([userData, transitionData]) => {
      this.isUserPopup = userData;
      this.isTransitionPopup = transitionData;
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
