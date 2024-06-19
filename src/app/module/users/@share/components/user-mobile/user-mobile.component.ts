import { Component } from '@angular/core';
import { UserClass } from '../../abstract/user';
import { ListIconsService } from '../../services/listIcon.service';
import { GlobalIconsService } from '../../../../../shared/services/globalIcon.service';
import { UserService } from '../../services/user.service';
import { ChangeMonitoringDataService } from '../../services/changeMonitoringData.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../../store/model/store.model';


@Component({
  selector: 'app-user-mobile',
  templateUrl: './user-mobile.component.html',
  styleUrls: ['./user-mobile.component.scss']
})
export class UserMobileComponent extends UserClass {

  public isActiveSlide: number = 0;
  public isOpen: boolean;
  public isOpenPayments: number;

  constructor(
    override store: Store<{ store: StoreInterface }>,
    override translate: TranslateService,
    override changeMonitoringDataService: ChangeMonitoringDataService,
    override userSerice: UserService,
    override globalIconsService: GlobalIconsService
  ) {
    super(store, translate, changeMonitoringDataService, userSerice, globalIconsService)
  }

  public openCard(email: string) {
    this.isOpen = !this.isOpen;
    this.isActiveEmail = email;

    this.setMonitoringDataOtherUser();
  }

  public changeActiveCard(id: number) {
    this.isActiveSlide = id;
  }

  public checkPayments(index: number) {
    this.isOpenPayments = index;
  }

}
