import { Component, } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UserSearchService } from '../../services/userSearch.service';
import { UserClass } from '../../abstract/user';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';
import { TranslateService } from '@ngx-translate/core';
import { ChangeMonitoringDataService } from '../../services/changeMonitoringData.service';
import { UserService } from '../../services/user.service';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { ListIconsService } from '../../services/listIcon.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends UserClass {

  public isSetting: boolean;

  constructor(
    private userSearchService: UserSearchService,
    override store: Store<{ store: StoreInterface }>,
    override translate: TranslateService,
    override changeMonitoringDataService: ChangeMonitoringDataService,
    override userSerice: UserService,
    override globalIconsService: GlobalIconsService,
    override listIconsService: ListIconsService,
  ) {
    super(store, translate, changeMonitoringDataService, userSerice, globalIconsService, listIconsService)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.streamSearchFilterData();
  }

  private streamSearchFilterData() {
    this.userSearchService._searchData$.pipe(takeUntil(this.destroy$)).subscribe((selectedField) => {
      this.userInfo.sort((a, b) => {
        let fieldA = this.getFieldValue(a, selectedField);
        let fieldB = this.getFieldValue(b, selectedField);

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return fieldA.localeCompare(fieldB);
        } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return fieldA - fieldB;
        } else {

          return 0;
        }
      });
    });
  }

  private getFieldValue(user: any, field: string): any {
    switch (field) {
      case 'email':
        return user.profile?.email || '';
      case 'userID':
        return user.profile?.userID || '';
      case 'name':
        return user.profile?.name || '';
      case 'balance':
        return user.monitoring?.balance ? parseFloat(user.monitoring.balance) : 0;
      case 'transactions':
        return user.monitoring?.transactions ? user.monitoring.transactions.length : 0;
      case 'rules':
        return user.profile?.rules || ''; // Assuming rules is a string or other comparable type
      default:
        return null;
    }
  }


  public openSettings(email: string) {
    this.isSetting = true;
    this.isActiveEmail = email;
    this.setMonitoringDataOtherUser();
  }


}
