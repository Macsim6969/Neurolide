import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileServices } from './@shared/services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private isPopupSubscription: Subscription;
  public isPopup: boolean;
  constructor(
    private profileService: ProfileServices
  ) { }

  ngOnInit(): void {
    this.initializeIsPopupOpen();
  }

  private initializeIsPopupOpen() {
    this.isPopupSubscription = this.profileService._isPopup$.subscribe((data: boolean) => {
      this.isPopup = data
    })
  }

  ngOnDestroy(): void {
    this.isPopupSubscription.unsubscribe();
  }

}
