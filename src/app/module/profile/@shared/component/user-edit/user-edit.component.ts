import { UserActions, UserData } from '../../interfaces/profile.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { StoreInterface } from '../../../../../store/model/store.model';
import { selectUserData } from '../../../../../store/selectors/store.selectors';
import { ProfileServices } from '../../services/profile.service';
import { AuthService } from '../../../../auth/@shared/services/auth.service';
import { Router } from '@angular/router';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { ProfileIconService } from '../../services/profileIcon.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public rules: 'manager' | 'brand' | 'affiliate';
  public url: string;
  public userInfo: UserData[];
  public userActions: UserActions[];
  public avatar: string;
  public isPopupAttention: boolean;
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private profileServices: ProfileServices,
    private authService: AuthService,
    private router: Router,
    private profileIcon: ProfileIconService
  ) { }

  ngOnInit(): void {
    this.initializeUserDataFromJsonAndStore();
    this.rules = JSON.parse(localStorage.getItem('rules'));
    this.url = localStorage.getItem('currentRoute');
  }

  private initializeUserDataFromJsonAndStore() {
    combineLatest(([this.translate.stream('user'), this.store.pipe(select(selectUserData))])).pipe(takeUntil(this.destroy$)).subscribe(([translateData, storeData]) => {
      this.userActions = translateData.userActions;
      this.userInfo = translateData.userInfo;
      this.avatar = storeData?.avatar;
      if (storeData) {
        if (Object.keys(storeData).length > 1) {
          this.updateHeaderData(storeData);
        } else {
          this.updateHeaderData(Object.values(storeData)[0]);
        }
      }
    })

  }

  private updateHeaderData(data: any) {
    if (this.userInfo && data) {
      this.userInfo = this.userInfo.map(card => {
        const key = card.key;
        const value = key === 'password' ? '*'.repeat(data[key]?.length) : data[key] || '';
        return {
          ...card,
          data: value
        };
      });
    }
  }

  public actionsLogout(action: string) {
    if (action === 'logout') {
      this.authService.logout();
      this.router.navigate(['/auth/login']).then();
    } else if (action === 'remove') {
      this.isPopupAttention = true;
    } else if (action === 'edit') {
      this.profileServices._isPopup = true;
    }
  }

  public removeAccount() {
    this.authService.deleteUser();
  }

  public  onOutsideClick(event: MouseEvent): void {
    this.isPopupAttention = false;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
