import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectUserData } from '../../store/selectors/store.selectors';
import { UserData } from '../../shared/interfaces/backend.interface';
import { SidebarData } from '../../shared/interfaces/sidebar.interface';
import { StoreInterface } from '../../store/model/store.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public userRule: string;
  public sidebarData: SidebarData[];
  private translateSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private store: Store<{ store: StoreInterface }>
  ) { }

  ngOnInit(): void {
    this.initialeUserRules();
    this.initializeSidebarDataFromJSON()
  }

  private initializeSidebarDataFromJSON() {
    this.translateSubscription = this.translate.stream('sidebar').subscribe((data: SidebarData[]) => {
      this.sidebarData = data;
    })
  }

  private initialeUserRules() {
    this.store.pipe(select(selectUserData)).subscribe((data: UserData) => {
      if (data) {
        this.userRule = data.rules;
        this.isLoading = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

}
