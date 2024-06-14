import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileServices } from './@shared/services/profile.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public isPopup: boolean;
  constructor(
    private profileService: ProfileServices
  ) { }

  ngOnInit(): void {
    this.initializeIsPopupOpen();
  }

  private initializeIsPopupOpen() {
    this.profileService._isPopup$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isPopup = data
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
