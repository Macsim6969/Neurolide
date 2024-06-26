import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileServices } from './@shared/services/profile.service';
import { Subject, takeUntil } from 'rxjs';
import { IsMobilePage } from '../../shared/abstract/mobilePage/mobilePage';
import { AuthService } from '../auth/@shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends IsMobilePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public isPopup: boolean;
  public addedCardPopup: boolean;
  constructor(
    private profileService: ProfileServices,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeIsPopupOpen();
  }

  private initializeIsPopupOpen() {
    this.profileService._isPopup$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isPopup = data
    })
  }



  public actionsLogout(action: string) {
    if (action === 'logout') {
      this.authService.logout();
      this.router.navigate(['/auth/login']).then();
    } else if (action === 'remove') {

      this.authService.deleteUser()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
