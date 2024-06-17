import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ProfileServices } from './@shared/services/profile.service';
import { Subject, takeUntil } from 'rxjs';
import { CardsconService } from '../../shared/services/balance/cardsIcon.service';
import { BalanceCardService } from '../../shared/services/balance/balanceCard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public isPopup: boolean;
  public isMobile: boolean;
  public addedCardPopup: boolean;
  constructor(
    private profileService: ProfileServices,
    private cardsconService: CardsconService,
    private balanceCard: BalanceCardService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.initializeIsMobilePage();
  }

  ngOnInit(): void {
    this.initializeIsMobilePage();
    this.initializeIsPopupOpen();
    this.streamOpenPopup();
  }

  private initializeIsMobilePage() {
    if (innerWidth < 1124) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  private initializeIsPopupOpen() {
    this.profileService._isPopup$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.isPopup = data
    })
  }

  private streamOpenPopup() {
    this.balanceCard._isAddCard$
      .pipe(takeUntil(this.destroy$)).subscribe((isAddedCard: boolean) => {
        this.addedCardPopup = isAddedCard;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
