import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectUserData } from '../../store/selectors/store.selectors';
import { UserData } from '../../shared/interfaces/backend.interface';
import { SidebarData } from '../../shared/interfaces/sidebar.interface';
import { StoreInterface } from '../../store/model/store.model';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SidebarService } from '../../shared/services/sidebarService';
import { IsMobilePage } from '../../shared/abstract/mobilePage/mobilePage';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends IsMobilePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public isLoading: boolean = false;
  public userRule: string;
  public sidebarData: SidebarData[];
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>,
    private sidebarService: SidebarService
  ) {
    super()
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initialeUserRules();
    this.initializeSidebarDataFromJSON()
  }

  private initializeSidebarDataFromJSON() {
    this.translate.stream('sidebar').pipe(takeUntil(this.destroy$)).subscribe((data: SidebarData[]) => {
      this.sidebarData = data;
    })
  }

  private initialeUserRules() {
    this.store.pipe(select(selectUserData)).pipe(takeUntil(this.destroy$)).subscribe((data: UserData) => {
      if (data) {
        this.userRule = data.rules;
        this.isLoading = true;
      }
    })
  }

  public removePopup() {
    this.sidebarService._isSidebarMobile = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
