import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopupInfoService } from './@shared/services/popupInfo.service';
import { Subject, take, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public isPopup: boolean;
  constructor(private popupInfoService: PopupInfoService) {}

  ngOnInit(): void {
    this.initializeStreamPopupIsAlert();
  }

  private initializeStreamPopupIsAlert() {
    this.popupInfoService._isAlert$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean) => {
        this.isPopup = data;

        if (this.isPopup) {
          timer(1000)
            .pipe(take(1))
            .subscribe(() => {
              this.popupInfoService._isAlert = false;
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
